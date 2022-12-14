import React, { useEffect, useState } from "react";

import TabelBarang from "../../Table/TabelBarang";
import AddIcon from "@mui/icons-material/Add";
import SearchBarang from "../../Table/SearchBarang";
import { CircularProgress, IconButton, Tooltip } from "@mui/material";
import RefreshIcon from '@mui/icons-material/Refresh';
import AddBarangKeluar from "../../Dialog/AddBarangKeluar";

// import data from '../../../assets/data/barangkeluar.json'
import { getAllBarangKeluar, getSelectedProyek } from "../../API/repository";


const meta1 = [
  "Nama Barang", "Kode Keluar",  "Quantity", "Nama Pengambil", "Tanggal", "Satuan",  "Keterangan", "Tujuan", "Action"
]

const meta = [
  "Nama Barang", "Kode Keluar",  "Nama Pengambil", "Quantity", "Tanggal", "Keterangan", "Tujuan", "Satuan", "Action"
]

// const rows = data;

function BarangKeluar(props) {

    const proyek = getSelectedProyek();

    const detail = {
      namabarang: "",
      namaPenerima: "",
      quantity: "",
      // noSuratJalan1: "",
      noSuratJalan: "",
      proyekAsal: "",
      // noSuratJalan2: "",
      tgl: "",
      lokasi: "",
      action: "",
      username: "",
      proyek: proyek,
      keterangan: "",
      satuan: "",
      supplier: "",
    };
  
    const [addItem, setAddItem] = useState(false);

    const openAddDialog = () =>{
      setAddItem(true)
    }

    const closeAddDialog = () =>{
      setAddItem(false)
    }

    /* Search */
    const [searchValue, changeSearchValue] = useState("");

    const changeValue = (event) => {
      changeSearchValue(event.target.value);
      // console.log('Div lost focus');
    };
  
    const filterSearch = (searchKey) => {
      const filteredRows = rows.filter((row) =>
        row.name.toLowerCase().includes(searchKey.toLowerCase())
      );
      return filteredRows;
    };

    const [rows, setRows] = useState([]);
    // data barang keluar dari DB 
    const getAllBarangKeluarAPI = async() => {
      const data = await getAllBarangKeluar(detail);
      let rowsData = []
      for (const barang of data){
        const newBarang = {
          //kodebarang: barang.kodebarang,
          namabarang: barang.namabarang,
          kodeKeluar: barang.kodeKeluar, 
          namaPengambil: barang.namaPengambil,
          quantity: barang.quantity,
          tgl: barang.tgl,
          // proyek: barang.proyek,
          keterangan: barang.keterangan,
          tujuan: barang.tujuan,
          satuan: barang.satuan
        }
        rowsData.push(newBarang);
      }
      return rowsData;
    }
    
    const [loading, setLoading] = useState(false);
    const load = () => {
      setLoading(true);
      setTimeout(()=> 
      
        getAllBarangKeluarAPI()
        .then((data)=>{
          setRows(data)
        }).finally(()=>{
          setLoading(false)
        })
      , 2000)
    }

    useEffect(() => {
      load();
    }, [])

    const refresh = () => {
      load();
    }
  
    return (
      <div className="content-wrapper">
        {/* Content Header (Page header) */}
        <section className="content-header">
          <div className="container-fluid">
            <div className="row mb-2">
              <div className="col-sm-6">
                <h1>Barang Keluar</h1>
              </div>
              <div className="col-sm-6">
                <ol className="breadcrumb float-sm-right">
                  <li className="breadcrumb-item">
                    <a href="#">Logistik</a>
                  </li>
                  <li className="breadcrumb-item active">Barang Keluar</li>
                </ol>
              </div>
            </div>
          </div>
          {/* /.container-fluid */}
        </section>
        <section className="content">
          <div className="container-fluid">
            <div className="row">
              <div className="col-12">
                <div className="card">
                <div 
                  className="card-header" 
                  style={{
                    display: "flex",
                    alignItems:'center' 
                  }}>
                    <div className="card-title">
                      <h3 className="card-title">List Barang Keluar</h3>
                    </div>
                    <div className="card-search" style={{marginLeft:'auto'}}>
                      <SearchBarang value={searchValue} changeValue={changeValue} />
                    </div>
                    <div className="add-item" style={{marginLeft: '5px'}}>
                      <IconButton onClick={openAddDialog}>
                        <Tooltip title="Remove">
                          <AddIcon />
                        </Tooltip>
                      </IconButton>
                      <IconButton onClick={refresh}>
                      <Tooltip title="refresh">
                        <RefreshIcon />
                      </Tooltip>
                    </IconButton>
                      <AddBarangKeluar open={addItem} close={closeAddDialog} />
                    </div>
                  </div>
                  {/* /.card-header */}
                  <div className="card-body"
                   
                  >
                    {loading ? 
                      <CircularProgress />
                      : 
                      <TabelBarang 
                        meta={meta}
                        data={searchValue === "" ? rows : filterSearch(searchValue)} 
                      />
                    }
                  </div>
                  {/* /.card-body */}
                </div>
                {/* /.card */}
              </div>
              {/* /.col */}
            </div>
            {/* /.row */}
          </div>
          {/* /.container-fluid */}
        </section>
      </div>
    );
}

export default BarangKeluar;
