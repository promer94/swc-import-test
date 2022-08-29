async function init() {
  return import("./bootstrap.js").then(() => {
    console.log("Bootstrap loaded")
  })
}

init()
