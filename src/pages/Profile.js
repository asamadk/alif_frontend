import React from "react"
import "../styles/Profile.css"

function Profile(){
    return(
        <div className="Profile">
            <h1>Profile</h1>
            <table>
                <tr>
                    <td><p>Name</p></td>
                    <td><p>Abdul Samad Kirmani</p></td>
                </tr>
                <tr>
                    <td><p>Mobile No.</p></td>
                    <td><p>7007475550</p></td>
                </tr>
                <tr>
                    <td><p>Email</p></td>
                    <td><p>abdul.samadkirmani.samad63@gmail.com</p></td>
                </tr>
                <tr>
                    <td><p>Gender</p></td>
                    <td><p>Male</p></td>
                </tr>
                <tr>
                    <td><p>Location</p></td>
                    <td><p>Banda</p></td>
                </tr>
                <tr>
                    <td><p>DOB</p></td>
                    <td><p>02/07/1999</p></td>
                </tr>
            </table>
            <button>Edit profile</button>
            <button>Change password</button>

        </div>
    )
}

export default Profile