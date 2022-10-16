var randomUsersList = []
var url = "https://randomuser.me/api/?results=1";
var p = "";
var radioValue;
var selectedNationality;
var loadMore;

$("input[type='radio']").click(function () {
radioValue = $("input[name='gender']:checked").val();
selectedNationality = $('#nationality :selected').text();
$("#result").empty();
url = "https://randomuser.me/api/?results=1&gender=" + radioValue + "&nat=" + selectedNationality;
if (radioValue) {
fetchInformation(url);
}
});

$('#nationality').on('change', function () {
var p = "";
$("#result").empty();
selectedNationality = $('#nationality :selected').text();
url = "https://randomuser.me/api/?results=1&gender=" + radioValue + "&nat=" + selectedNationality;
fetchInformation(url);
});

function fetchInformation(url) {
fetch(url)
.then((response) => response.json())
.then(function (data) {

data.results.forEach(person => {

p = `<div class="well" style="font-size:15px;text-align:center;font-family:Lucida Handwriting">
<img src="${person.picture.medium}" style="border-radius:100%; width:200px;" alt="image">
<br>
<br>
<i style="font-size:24px;" class="fa">&#xf007;</i>
<span style="margin-left:0px;">${person.name.title} ${person.name.first} ${person.name.last}</span>
<span>(${person.nat})</span>
<br>

<br>
<i class="glyphicon glyphicon-envelope" style="font-size:24px"></i>
<span style="margin-left:0px;" >${person.email}</span>
<br>
<br>
<i class="fa fa-phone"style="font-size:24px" ></i>
<span style="margin-left:0px;">${person.phone}</span>
<br>
<br>
<i style="font-size:24px;" class="fa">&#xf073;</i>
<span style="margin-left:2px;font-size:20px;">${person.dob.age}</span>
<br>
<br>
<i style="font-size:24px;" class="fa">&#xf041</i>
<span style="margin-left:0px;">${person.location.city}</span>
</div>`;
$("#result").append(p);
randomUsersList.push({
  medium : person.picture.medium,
  title : person.picture.title,
  firstName : person.name.first,
  lastName : person.name.last,
  nat : person.nat,
  email : person.email,
  phone : ""+person.phone,
  age : ""+person.dob.age,
  city : person.location.city
});
});

loadMore = '<button id="loadmore" class="btn btn-primary" style="text-align:center;font-family:Lucida Handwriting;right:45%;position:absolute;">Load More</button>';

$("#result").append(loadMore);

$('#loadmore').on('click', function () {
fetchInformation(url);
$(this).remove();
});


})
}

$(document).ready(function () {
fetchInformation(url);
});

$("#search-button").on("click",function(){
  var query = $("#search-input").val();
  $("#search-input").val("");

  $("#result").empty();

  for(var i=0;i<randomUsersList.length;i++)
  {
    var user = randomUsersList[i];

    console.log(typeof(user.age));

    if(user.medium === query || user.title === query || user.nat === query || user.firstName === query || user.lastName === query || user.email === query || user.phone === query || user.age === query || user.city === query)
    {
      p = `<div class="well" style="font-size:15px;text-align:center;font-family:Lucida Handwriting">
      <img src="${user.medium}" style="border-radius:100%; width:200px;" alt="image">
      <br>
      <br>
      <i style="font-size:24px;" class="fa">&#xf007;</i>
      <span style="margin-left:0px;">${user.title} ${user.firstName} ${user.lastName}</span>
      <span>(${user.nat})</span>
      <br>

      <br>
      <i class="glyphicon glyphicon-envelope" style="font-size:24px"></i>
      <span style="margin-left:0px;" >${user.email}</span>
      <br>
      <br>
      <i class="fa fa-phone"style="font-size:24px" ></i>
      <span style="margin-left:0px;">${user.phone}</span>
      <br>
      <br>
      <i style="font-size:24px;" class="fa">&#xf073;</i>
      <span style="margin-left:2px;font-size:20px;">${user.age}</span>
      <br>
      <br>
      <i style="font-size:24px;" class="fa">&#xf041</i>
      <span style="margin-left:0px;">${user.city}</span>
      </div>`;
      $("#result").append(p);
    }
  }

  loadMore = '<button id="loadmore" class="btn btn-primary" style="text-align:center;font-family:Lucida Handwriting;right:45%;position:absolute;">Load More</button>';

  $("#result").append(loadMore);

  $('#loadmore').on('click', function () {
  fetchInformation(url);
  $(this).remove();
  });

});