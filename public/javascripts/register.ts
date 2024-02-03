const getDataRegisterUser = () => {
    // collect dom.
    const username: string = (<HTMLInputElement>document.getElementById("username")).value;
    const nickname: string = (<HTMLInputElement>document.getElementById("nickname")).value;
    const firstname: string = (<HTMLInputElement>document.getElementById("firstname")).value;
    const lastname: string = (<HTMLInputElement>document.getElementById("lastname")).value;
    const email: string = (<HTMLInputElement>document.getElementById("email")).value;
    const password: string = (<HTMLInputElement>document.getElementById("password")).value;

    // get data
    const dataRegister = {
        username,
        nickname,
        firstname,
        lastname,
        email,
        password
    };

    // send data

    console.log(dataRegister);
}