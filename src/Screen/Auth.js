import React from 'react'
import GoogleLogin from 'react-google-login'
import {
    Card, CardBody,
    CardTitle
} from 'reactstrap';
import logo from './download (1).png'
const gradient = {
    padding: "20px",
    width: "100%",
    height: "740px",
    background: "linear-gradient(to right, #ffff, #fff)"
}

export default function Auth() {
    const successRes = (res) => {
        localStorage.setItem("loggedIn", "true")
        localStorage.setItem("email", res.profileObj.email)
        localStorage.setItem("name", res.profileObj.givenName)
        console.log(res.profileObj)
        window.location.pathname = '/dashboard'
    }

    const failureRes = (res) => {
        console.log(res)
    }

    

    return (
      <div className="nav1" style={{ backgroundImage: `url(${require("./space.png")})` }}>
        <div style={gradient} className="jumbotron d-flex align-items-center">
            <div class ="container text-center">
              <img src={logo} alt="spaceX" class="navbar-brand"></img>
                <Card style={{ padding: "10px" }} className="resDiv">
                    <CardBody>
                        <CardTitle>
                            <h3 style={{ fontWeight: "bold" }}>Authenticate via google</h3>
                        </CardTitle>
                    </CardBody>
                    <img width="80%" className="mx-auto" />

                    <CardBody>
                        <GoogleLogin
                            clientId="361787492267-quoqq067rg4b9iaqjot2005dor4ch4n5.apps.googleusercontent.com"
                            onSuccess={successRes}
                            onFailure={failureRes}
                            redirectUri="/dashboard"
                            buttonText = {<b> Sign in with Google </b>}
                            className="googlebutton mt-4 rounded-pill"
                        />
                    </CardBody>
                </Card>
            </div>
        </div>
      </div>
    )
}