$(function(){
  $('#toggle').click(function(){
    $('#target').toggleClass('active');
  });
});

function initDataTable() {
  new DataTable('#example');
}
