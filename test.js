function animateLoading() {
    const frames = ["|", "/", "-", "\\"];
    let index = 0;
  
    setInterval(() => {
      process.stdout.write(`Loading ${frames[index]} \r`);
      index = (index + 1) % frames.length;
    }, 200);
  }
  
  animateLoading();
  