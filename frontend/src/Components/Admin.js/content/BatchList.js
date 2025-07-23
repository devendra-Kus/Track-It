import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Apis from '../../../Apis';
import { list } from '../../../redux/BatchSlice';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import Header from '../Header';
import { Paper, Typography } from '@mui/material';

export default function BatchList() {
  const [batchName, setBatchName] = useState("");
  const dispatch = useDispatch();
  const { batchList } = useSelector((store) => store.Batch);
  const { token } = useSelector((store) => store.LoginToken);
  const [click, setClick] = useState('none');
  const [head, setHead] = useState('');
  const [btn1, setBtn1] = useState(false);
  const [btn2, setBtn2] = useState(false);

  useEffect(() => {
    const batch = async () => {
      try {
        let response = await axios.get(Apis.ADMIN_BATCHES, { headers: { Authorization: `Bearer ${token}` } });
        if (response.status === 200) {
          dispatch(list(response.data.batches));
        }
      } catch (err) {
        console.log(err);
      }
    };
    batch();
  }, [dispatch, token]);

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      let response = await axios.post(Apis.ADMIN_CREATE_BATCH, { name: batchName }, { headers: { Authorization: `Bearer ${token}` } });
      if (response.status === 200) alert("Batch Created Successfully");
      setClick('none');
    } catch (err) {
      setClick('none');
      console.log(err);
    }
  };

  const handleDelete = async (e) => {
    e.preventDefault();
    try {
      let response = await axios.delete(`${Apis.ADMIN_Delete_BATCH}/${batchName}`, { headers: { Authorization: `Bearer ${token}` } });
      if (response.status === 200) setClick('none');
    } catch (err) {
      setClick('none');
      console.log(err);
    }
  };

  const handleformCreate = () => {
    setBtn1(false);
    setHead('Create Batch');
    setBtn2(true);
    setClick(click === 'none' ? 'block' : 'none');
  };

  const handleformDelete = () => {
    setBtn2(false);
    setHead('Delete Batch');
    setBtn1(true);
    setClick(click === 'none' ? 'block' : 'none');
  };

  return (
    <div className='mainContent overflow-auto' style={{ background: "linear-gradient(to right, #e0f7fa,rgb(178, 235, 242), fontWeight: 700, color: '#6a1b9a', mb: 4)", minHeight: "100vh", padding: "2rem" }}>
      <Header heading={'🎓Manage Batches'} />
      <div className="row g-4 mb-5">
        {batchList.map((ele) => (
          <div key={ele.id ?? ele.name} className="col-md-3 d-flex justify-content-center">
            <Paper elevation={4} className="p-3 text-center" sx={{
              width: '180px',
              height: '110px',
              borderRadius: '1rem',
              background: 'linear-gradient(135deg,rgb(152, 223, 247) 0%,rgba(61, 60, 62, 0.83) 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontWeight: 'bold',
              cursor: 'pointer',
              transition: '0.3s',
              '&:hover': {
                transform: 'scale(1.05)',
                boxShadow: '0 8px 20px rgba(0, 0, 0, 0.2)'
              }
            }}>
              {ele.name}
            </Paper>
          </div>
        ))}
      </div>

      <div className="container p-4 rounded" style={{ width: "600px", display: click, background: "linear-gradient(to right, #fbc2eb, #a6c1ee)", boxShadow: "0 4px 20px rgba(0,0,0,0.15)" }}>
        <h2 className='fw-bold text-dark mb-3'>{head}</h2>
        <form>
          <div className="form-group mb-3">
            <label className='fw-semibold mx-2'>Batch Name:</label>
            <input onChange={(e) => setBatchName(e.target.value)} type="text" className="form-control" placeholder="Enter the batch name" />
          </div>
          <div className="d-flex justify-content-end gap-2">
            {btn1 && <button onClick={handleDelete} className='btn btn-sm btn-outline-danger'><DeleteIcon fontSize="small" /> Delete</button>}
            {btn2 && <button onClick={handleCreate} className='btn btn-sm btn-outline-success'><AddIcon fontSize="small" /> Create</button>}
          </div>
        </form>
      </div>

      <div className='row mt-5 justify-content-center'>
        <div className="col-md-4 card m-3 text-center py-3" onClick={handleformCreate} style={{ border: '2px dashed #1976d2', color: '#1976d2', cursor: 'pointer', background: 'linear-gradient(to right, #e1f5fe, #b3e5fc)' }}>
          <AddIcon fontSize='medium' /><br /><span className="fw-bold">Add New</span>
        </div>

        <div className="col-md-4 card m-3 text-center py-3" onClick={handleformDelete} style={{ border: '2px dashed #d32f2f', color: '#d32f2f', cursor: 'pointer', background: 'linear-gradient(to right, #ffebee, #ffcdd2)' }}>
          <DeleteIcon fontSize='medium' /><br /><span className="fw-bold">Delete</span>
        </div>
      </div>
    </div>
  );
}

