//Name: Brejanth Rajendran
//StudentId: 100557484
//Date: 2020/03/08
class Contact
{
    constructor(contactName = "", emailAddress = "", contactNumber = "", contactMessage = "")
    {
        this.contactName = contactName;
        this.emailAddress = emailAddress;
        this.contactNumber = contactNumber;
        this.contactMessage = contactMessage;
    }
}




"use strict";
//IIFE - Immediately Invoked Function Expression
// mean? -> anonymous self-executing function

let app;
(function(app){

    // Declare Function Variables here...
    console.log("%cDeclaring Variables", "color: red;")
    let contactObject = new Contact();

    /**
     * Variable initialization in this function
     *
     */
    function Start()
    {
       PageSwitcher();

        Main();
    }

    function PageSwitcher()
    {
        let name = window.location.pathname;

        

        let pageName = name.substring(1, name.length - 5);

        // fixed bug in page switching
        if(name == "/")
        {
            pageName = "index";
        }
       

       switch(pageName)
        {
            case "index":
               DisplayHomePageContent();
                break;
            case "products":
                DisplayProductsContent();
                break;
            case "services":
                DisplayServicesContent();
                break;
            case "about":
                DisplayAboutContent();
                break;
            case "contact":
                DisplayContactContent();
                break;
            case "projects":
                DisplayProjectsContent();
                break;
            case "login":
                DisplayLoginContent();
                break;
            case "register":
                DisplayRegisterContent();
                break;
            case "tasklist":
                DisplayTaskList();
                break;
            default:
                console.error("Landed in a page that is not defined");
                break;
        }

    }

    function DisplayHomePageContent()
    {
        document.getElementById("home").className = "nav-item active";

        document.title = "WEBD6201 - Home";

        let taskListButton = $("#taskListButton").click(function(){
            location.href = "./tasklist.html";
        });
    }

    function DisplayTaskList()
    {
        document.title = "WEBD6201 - Task List";

        // Task 1 a
        $("#newTaskButton").on("click", function(){
 
            // When new task button is clicked a new li will be made with the text the user inputed, it will be appened to the bottom of the list
        $(`<li class="list-group-item" id="task"> 
            <span id="taskText">`+$("#taskTextInput").val()+`</span> 
            <span class="float-right"> 
            <button class="btn btn-outline-primary btn-sm editButton"><i class="fas fa-edit"></i>
            <button class="btn btn-outline-danger btn-sm deleteButton"><i class="fas fa-trash-alt"></i></button> 
            </span>  
            <input type="text" class="form-control edit-task editTextInput">  
        </li>`).appendTo( $("ul")[1]);

        });

        // Task 1 b
        $("ul").on("click", ".editButton", function(){
            //sets the css display to show
            // as of now all of the text boxes are being shown
            $(".editTextInput").show();
           
           
            //if a button is clicked while in the text box
            $('.editTextInput').on("keypress", function(press) {
                //if the enter button is clicked
                if (press.keyCode == 13) {
                    //console.log($(".editTextInput").val())

                    //changes old text to new text
                    //only the top link works because it grabs text from the first avalaible textbox and places it in the first list
                    $('#taskText').text($(".editTextInput").val());

                    //sets the css display to hidden
                   $(".editTextInput").hide();
                    
                }
            });
        
          
        });

        // Task 1 c
        $("ul").on("click", ".deleteButton", function(){
            //if the delete button is activated then a pop up that asks the user if they want to delete    
  

           // creates a dialog box that asks the user if they are sure
            if(confirm("Are You Sure?"))
            {  
                //removes the task
                // one parent goes to the span tag, and the next goes to the actual list tag
                $(this).parent().parent().remove();
            }
        
        });
    }

    function DisplayProductsContent()
    {
        document.title = "WEBD6201 - Products";
    }

    function DisplayServicesContent()
    {
        document.title = "WEBD6201 - Services";
    }

    function DisplayAboutContent()
    {
        document.title = "WEBD6201 - About Us";
    }

    function DisplayContactContent()
    {
        document.title = "WEBD6201 - Contact Us";
        function clearForm()
        {
            //document.getElementById("contactForm").reset();
            $("#contactForm")[0].reset();
            $("#errorMessage").hide();
        }

        function validateInput(selector, condition, errorMessage)
        {
            if(condition)
            {
                $("#errorMessage").show();
                $("#errorMessage").text(errorMessage);
                $(selector).select();
                $(selector).css("border", "2px solid red");
            }
            else
            {
                $("#errorMessage").hide();
                $(selector).css("border", "1px solid #ced4da");
            }
        }

        $("#errorMessage").hide();
        $("#contactName").select();

        // Contact Name Events
        $("#contactName").blur((e)=>
        {
            validateInput("#contactName",( $("#contactName").val().length < 2),"Contact Name is Too Short");
        });

        $("#contactName").focus((e)=>
        {
            $("#contactName").select();
        });

        // Email Events
        $("#emailAddress").blur((e)=>
        {
            validateInput("#emailAddress",($("#emailAddress").val().length < 8) || (!$("#emailAddress").val().includes("@")),"Invalid Email Address");
        });

        $("#emailAddress").focus((e)=>
        {
            $("#emailAddress").select();
        });

        // Contact Number Events
        $("#contactNumber").blur((e)=>
        {
            let phonePattern = /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]\d{3}[\s.-]\d{4}$/
            let phoneNumber = $("#contactNumber").val();

            validateInput("#contactNumber",( !phonePattern.test(phoneNumber)),"Invalid Contact Number");
        });

        $("#contactNumber").focus((e)=>
        {
            $("#contactNumber").select();
        });

        // Contact Message Events
        $("#contactMessage").blur((e)=>
        {
            validateInput("#contactMessage",( $("#contactMessage").val().length < 2 ),"Contact Message Too Short");
        });

        $("#contactMessage").focus((e)=>
        {
            $("#contactMessage").select();
        });


        $("#contactForm").submit  ((e)=>
        {
            if(document.getElementById("contactForm").checkValidity() == false)
            {
                e.preventDefault();
                e.stopPropagation();
                console.log("form not valid");
            }

            
            let contactName = $("#contactName").val();
            let emailAddress = $("#emailAddress").val();
            let contactNumber = $("#contactNumber").val();
            let contactMessage = $("#contactMessage").val();

            console.log(`Contact Name: ${contactName}`);
            console.log(`Email Address: ${emailAddress}`);
            console.log(`Contact Number: ${contactNumber}`);
            console.log(`Contact Message: ${contactMessage}`);

            contactObject.contactName = contactName;
            contactObject.emailAddress = emailAddress;
            contactObject.contactNumber = contactNumber;
            contactObject.contactMessage = contactMessage;

            console.log(contactObject);

            clearForm();
        });

        $("#resetButton").click((e)=>
        {
            e.preventDefault();
            if(confirm("Are You Sure?"))
            {
                clearForm();
            }

            
        });
    }

    function DisplayProjectsContent()
    {
        document.title = "WEBD6201 - Projects";
    }

    function DisplayLoginContent()
    {
        document.title = "WEBD6201 - Login";

        $("#loginForm").submit  ((e)=>
        {
           
            e.preventDefault();
            e.stopPropagation();
            $("#loginForm")[0].reset();
            $("#login").hide();
            $("#logout").show();

        });

    }

    function DisplayRegisterContent()
    {
        document.title = "WEBD6201 - Register";
    }

    /**
     * Main Program entry point is here
     *
     */
    function Main()
    {
       
    }
    
    

    window.addEventListener("load", Start);
})(app || (app = {}));

