import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import '../styles/bill.css'

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import html2canvas from 'html2canvas';
import jsPdf from 'jspdf';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

function createData(
    no,
    name,
    HSN,
    qty,
    unit,
    price,
    amount,
) {
    return { no, name, HSN, qty, unit, price, amount };
}

const rows = [
    createData(1, 'P FILM KMX 100 2M 175 MICRON 33X48.2 CM', 392062, 2, 'Shirt', 2, 1999),
    createData(2, '', 1, 2, '', 3, 1999),
    createData(3, '', 1, 2, '', 3, 1999),
    createData(4, '', 1, 2, '', 3, 1999),
    createData(5, '', 1, 2, '', 3, 1999),
];


const BillGenerator = () => {

    const printDocument = () => {
        const input = document.getElementById('bill');
        console.log('INPUT', input);
        html2canvas(input)
            .then((canvas) => {
                const imgData = canvas.toDataURL('pdf');
                const pdf = new jsPdf();
                pdf.addImage(imgData, 'JPEG', 0, 0);
                // pdf.output('dataurlnewwindow');
                pdf.save("download.pdf");
            })
            ;
    }

    let { orderid } = useParams();
    console.log(orderid)



    return (
        <>
            <div id="bill" className="bill-parent-container">
                <div className="bill-main-container">
                    <h3>GSTIN : 07AJUPG8895N1ZY </h3>
                    {/* <button >PRINT</button> */}
                    <h1 onClick={printDocument} >Tax Invoice</h1>
                    <h1 className="heading-bill" >Alif Clothing</h1>
                    <h1 className="contact-info">UPPER GROUND FLOOR, PVT-2,, KH NO 631/2, SANT NAGAR, </h1>
                    <h1 className="contact-info">Tel. : 7007475550 email : abdul.samadkirmani.samad63@gmail.com</h1>
                    <div className="bill-grid-container">
                        <div className="grid-1">
                            <h1>Invoice No. : 2022-23/346 </h1>
                            <h1>Date of Invoice : 19-08-2022</h1>
                            <h1>Place of Supply : Uttar Pradesh (09)</h1>
                            <h1>Reverse Charge : N</h1>
                        </div>
                        <div className="grid-1">
                            <h1>GR/RR No. : </h1>
                            <h1>Transport : RAJ KALPNA TRAVELS </h1>
                            <h1>Vehicle No. : </h1>
                            <h1>Station : BANDA </h1>
                        </div><div className="grid-1">
                            <h1>Billed to : </h1>
                            <h1>B DIGITAL PRINT</h1>
                            <h1>CIVIL LINE BANDA U.P </h1>
                            <h1>8808944904 </h1>
                            <h1>GSTIN / UIN : 09AEXPJ5013R1ZN </h1>
                        </div><div className="grid-1">
                            <h1>Shipped to :</h1>
                            <h1>B DIGITAL PRINT</h1>
                            <h1>CIVIL LINE BANDA U.P </h1>
                            <h1>8808944904 </h1>
                            <h1>GSTIN / UIN : 09AEXPJ5013R1ZN</h1>
                        </div>
                    </div>
                    <table className="table-container">
                        <tr>
                            <th>S.N. </th>
                            <th> Description of Goods </th>
                            <th>HSN/SAC</th>
                            <th>Qty.</th>
                            <th>unit</th>
                            <th>price</th>
                            <th>amount</th>
                        </tr>
                        <tr>
                            <td>1</td>
                            <td>P FILM KMX 100 2M 175 MICRON 33X48.2 CM</td>
                            <td>392062 </td>
                            <td>500.00 </td>
                            <td>SHIRT</td>
                            <td>1399</td>
                            <td>1999</td>
                        </tr>
                        <tr>
                            <td>2</td>
                            <td></td>
                            <td> </td>
                            <td> </td>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr><tr>
                            <td>3</td>
                            <td></td>
                            <td> </td>
                            <td> </td>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr><tr>
                            <td>4</td>
                            <td></td>
                            <td> </td>
                            <td> </td>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>
                    </table>
                    <div className="add-extra-charges">
                        <h1>Add : Freight & Forwarding Charges</h1>
                        <h1>Add : IGST @ 18.00 % </h1>
                    </div>
                    <div className="bank-details">
                        <h2>Bank Details : BANK NAME-INDIAN BANK A/C NO-50488656420</h2>
                        <h2>BRANCH-HAUZ QAZI DELHI IFSC-IDIB000H559</h2>
                    </div>
                    <div className="bill-grid-container">
                        <div className="grid-2">
                            <h2>Terms & Conditions</h2>
                            <h2>E.& O.E. </h2>
                            <h2>1. Goods once sold will not be taken back.  </h2>
                            <h2>2. Interest @ 18% p.a. will be charged</h2>
                            <h2>3. Subject to 'Delhi' Jurisdiction only. </h2>
                        </div>
                        <div className="grid-2">
                            <h2>Receiver's Signature :</h2>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default BillGenerator;