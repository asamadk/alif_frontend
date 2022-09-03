import axios from 'axios'
import React from 'react'
import CircularProgress from '@mui/material/CircularProgress';
import { useParams } from "react-router-dom";
import html2canvas from 'html2canvas';
import jsPdf from 'jspdf';
import '../styles/TailorDetails.css'

import * as URL from '../Helper/endpoints'

export default function TailorDetails() {
    let { orderid } = useParams();
    const [order, setOrder] = React.useState([]);
    const [products, setPRoducts] = React.useState([]);
    const [loading,setLoading] = React.useState(false);

    console.log('ORDER ID : ',orderid)
    React.useEffect(() => {
        setLoading(true);
        axios.get(URL.GET_FOR_TAILOR+orderid).then((res) => {
            setLoading(false);
            let data = res?.data?.responseWrapper[0];
            if(data != null){
                setOrder(data);
                // if(data.)
                console.log(JSON.stringify(data))
            }
        }).catch(err => {
            setLoading(false);
            console.log(err);
        })
    },[]);

    const printDocument = () => {
        const input = document.getElementById('tailor');
        console.log('INPUT',input);
        html2canvas(input)
          .then((canvas) => {
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPdf();
            pdf.addImage(imgData, 'JPEG', 0, 0);
            // pdf.output('dataurlnewwindow');
            pdf.save("download.pdf");
          })
        ;
      }

    let circularCss = {
        color: '#e60023',
        position: 'absolute',
        top: '50%',
        left: '50%',
        marginTop: '-12px',
        marginLeft: '-12px',
      }

  return (
    <>
    {loading && <CircularProgress size={34} sx={circularCss} />}
    <div id='tailor' className='tailor-detail-container'>
        <h1>Product Details</h1>
        <button onClick={printDocument}>Download</button>
    </div>
    </>
  )
}
