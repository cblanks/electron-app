process.on('message', function(m) {

  console.log(m + 'received.');
  // Pass results back to parent process
  process.send('Finished');
});
