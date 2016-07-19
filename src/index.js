
function helloWorld(){
    console.log("Hello world!");

    window.callPhantom({ screenShotname: "helloworld" });
}

const Main = {
    helloWorld,
};

// we put all of our functions that you want to be able to call directly onto the
// Main object, and then export a single reference onto the window
window.Main = Main;

// not really going to take advantage of this, we are shoving stuff on the window
export default Main;
