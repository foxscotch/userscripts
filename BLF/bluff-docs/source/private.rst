===============================
Private functions and variables
===============================


This document describes functions and variables used internally that aren't
exported to the global scope. The reason I'm documenting them is because... it
feels right. I dunno.


.. js:function:: getPageType()
   
   Returns the "page type," as I call it. For more info, see :js:data:`pageType`


.. js:function:: getSession()
   
   Returns the currently logged in user's current session ID. It gets it from
   the logout button, since it's present on every page, as far as I know.


.. js:function:: getUserName()
   
   Returns the currently logged in user's username. It gets it from the welcome
   message at the top of the page, also because it's visible on every page.