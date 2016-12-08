angular.module('blogger', [])
.controller('MainCtrl', [
  '$scope','$http',
  function($scope,$http){
   //  $scope.test = 'Hello world!';
   $scope.addContentButton = false;
   $scope.deletePostButton = false;

	  $scope.contents = [
      {
        title:'Bringing Firebase To Your Server',
        picture:"https://i.ytimg.com/vi/sioEY4tWmLI/maxresdefault.jpg",
        content:"With Firebase, we've been working towards a world where developers don't have to deal with managing servers and can instead build web and mobile apps with only client-side code. However, there are times when you really do need to spin up your own server. For example, you may want to integrate with a third-party API (such as an email or SMS service), complete a computationally expensive task, or have a need for a trusted actor. We want to make your experience on this part of your stack as simple as it is on the front-end. Towards that aim, we announced the Firebase Admin SDKs for Node.js and Java at the Firebase Dev Summit in Berlin earlier this week."},

      {title:'MongoDB launches Atlas, its new database-as-a-service offering', picture:"http://blogs-images.forbes.com/adrianbridgwater/files/2016/06/1mongo.jpg?width=960", content:"MongoDB, the company behind the eponymous open source database, is launching Atlas today, its third major revenue-generating service. Atlas is MongoDB’s database-as-a-service offering that provides users with a managed database service. The service will offer pay-as-you-go pricing and will initially allow users to deploy on Amazon Web Services (AWS), with support for Microsoft Azure and Google Cloud Platform coming later. MongoDB Atlas complements the company’s commercial offering for enterprises who want to run the service on-premise, and MongoDB Professional, which provides businesses with support and access to the company’s Cloud Manager and other tools. Atlas fits somewhere between these two services. It allows anybody who wants to use MongoDB to quickly provision it in the cloud, get support, and only pay an hourly fee. MongoDB’s VP of Strategy Kelly Stirman tells me that he believes most developers love MongoDB because it makes them productive (though it’s worth noting that there are, of course, also plenty of developers who don’t love MongoDB). MongoDB is great for developing the application, he said. But when it comes to deploying the application in production, that’s where developers can get stuck. With this, we took all the experience we have supporting large systems and deployments in production — and the software we developed to help people. As a user, you don’t need to know much more than where you want to deploy and what size database you need."},
      {title:"Using Angular CLI to create Angular 2 applications in Docker", picture:"https://yellowpencil.com/assets/blog/banners/banner-angularjs.jpg", content:"Angular CLI is a great tool for developing  Angular 2 applications.  Now that the final 2.0 release is out and the masses are starting to be interested I thought it would be fun to do a quick demo of how you can try out the Angular CLI (github) project without having to install all the tools on your local machine.  The caveat there is that I assume you already have Docker installed. In that file we specify we want to use the current Node.js image as our base. Then we setup our home directory so our code will have a place to live. Next we use NPM (Node Package Manager) to install the Angular CLI tool chain. Then we expose the default port the Angular 2 project will be served to the browser from, and we open up the port that will be used for live reloading of code. Next we want to create a docker-compose.yml file which will define our service we will use to execute the build commands and run our development web server iniside."},
    ];

    $scope.userLogin = function(var user){
      console.log("loggin in angular");
      $scope.currentUser = user;
      $("#addContentButton").show();
      $("#deletePostButton").show();
    }

    $scope.userLogout = function(){
      console.log("loggout in angular");
        $("#addContentButton").hide();
        $("#deletePostButton").hide();
    }



    $scope.create = function(data){
      return $http.post('/content', data).success(function(data){
        // console.log("Blame thing: ", data);
        $scope.contents.push(data);
      });
    };

     $scope.delete = function(elementId){
      return $http.delete('/content/'+ elementId).success(function(data){
        $scope.getAll();
        console.log("deleted!");
        // $scope.contents.push(data);
      });
    };



	$scope.addContent = function(){

    if(($scope.formTitle != "" && $scope.formTitle != undefined) && ($scope.formContent != "" && $scope.formContent != undefined)){

      if($scope.formPicture == '' || $scope.formPicture == undefined){
        $scope.formPicture = "images/placeholder.gif";
      }

      $scope.create({title:$scope.formTitle,content:$scope.formContent, picture:$scope.formPicture});
      $scope.formContent='';
      $scope.formTitle='';
      $scope.formPicture='';

    }


  };

  $scope.deleteContent = function(index){
    $scope.delete($scope.contents[index]._id);
  }


  $scope.getAll = function(){
    return $http.get('/content').success(function(data){
      angular.copy(data, $scope.contents);
    });
  };
  $scope.getAll();

  }
]);
