# ecda_prototype3

I have updated the prototype on my personal azure cloud here -- 
http://ecda-prototype3.azurewebsites.net/start.html   
 
login with your Ewav email / password or just use the defaults.             
 
Gir repository --     
https://github.com/dshorter/ecda_prototype3   
 
 
The following are highlights of this push, and also the start of the documentation we talked about earlier.     
 
User interface. 
·         Epi Curve.   A working epi curve gadget. 
·         Chart Exploration.  The Google Chart API  features an “experimental” exploration feature that allows for y-axis zoom in and out, among other things.  I have it turned on, and it works nicely from a desktop browser.  Use the left mouse button to drag a chart zoom rectangle.  Right-click to reset the chart extent.  
·         Epi Curve toolbar buttons.  Several non-functioning buttons are there to stimulate the imagination.  There are two buttons that open up a gadget properties section, showing one way it might be implemented.  (Note: Since this is an early technology proof-of-concept  I am not spending a lot of effort on refined UI artifacts.  )               
·         Placeholder Gadgets.   In earlier updates, gadgets were represented as large generic placeholders that displayed a few data points from the selected canvas file.  For this update, gadgets (except for Epi Curve ) are represented as very  small placeholders.           
Refactoring.    
·         The structure of the application’s polymer elements has gone through another round of refactoring, now with fewer layers of nesting between the highest level element ( <ecda-app/> ) and the current lowest level  ( <ecda-gadgetname/>).  The result is a simpler, flatter application.                 
Tooling    
·         Modern HTML 5 Web Component / JavaScript solutions rely heavily on external ( <import> <script> and CSS ) resources.  These applications demand vigilance and a true rigor in life-cycle management if  reliable dev environments, builds, and deployments are the goal.  To that end the following were implemented     
o   Bower Audit and cleanup.  The Google Polymer project team uses the popular Bower tool to manage dependencies among Polymer elements.  When a component is installed locally from a Bower repository there is an option ( --save )  to “register”, or create an entry for that component, in the application’s local Bower.json file.  If this option is used for every component an application uses there is no need to add the potentially large and unwieldy Bower_components folder to an application’s source control repository.  ( For example, this application’s Bower_components folder already holds 2048 files in 371 folders with a total size of 29 MB )  Again,  there is no need for all of this to go into an application’s source control repository.  A developer can simply get the application code from source control, then run Bower –update to retrieve all the components.  This is now possible with this application. 
o   Source code refactoring       
§  Consolidation of all   element  <imports> into one file.  This stabilizes the application, makes it more maintainable, and most importantly,  sets the stage for a clean vulcanization (explained later ).    
o   Build tasks.  The build “script” in whatever form it takes should be started very early in a project’s life-cycle, long before the first production build actually happens.  Then it should remain a living document, maintained and updated religiously as the application grows and changes.  The current build plan includes the following        
§  Gulp to manage the build process.  Gulp is a widely used tool that manages a build process imperatively through JavaScript.  This application’s build process includes the following so far --      
·         Bower refresh   Update Bower components    
·         Vulcanization of the application.  Very exciting.  The vulcanize tool “in-lines” all scripts and imports that a HTML application references.  The result is a single, monolithic production html file that dramatically increases the performance of a large web application.  Critical metrics such as number of requests, and page download size in particular are greatly reduced.  The numbers speak for themselves:   
      
·         Minification.  All whitespace is removed, variable names are shortened, and all comments are dropped.  This reduces file size and increases application performance in the browser. 
·         Data integrity   
o   The application now uses  a the js-schema JavaScript library for simple, “developer-defined” Json schema validation.  This is in contrast to the fledgling and much maligned Json schema project.  I have created a simple scheme that just checks that all columns are present ( and implicitly, spelled correctly ).   
 
