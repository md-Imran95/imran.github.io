document.getElementById("output").style.visibility = "hidden";

document.getElementById("GST").addEventListener("input", function(e) {

  document.getElementById("output").style.visibility = "visible";

  const gst=document.getElementById('GST');
  const amt =document.getElementById('amount');
  

  // calculating the values
  const calNet=parseFloat(amt.value);
  const calGst=parseFloat((amt.value*gst.value)/100);
  const calgross=parseFloat(amt.value)+calGst;

  document.getElementById("netOutput").innerHTML = calNet +'/-';
  document.getElementById("gstOutput").innerHTML = calGst+'/-';
  
  document.getElementById("grossOutput").innerHTML = calgross+'/-';
});
