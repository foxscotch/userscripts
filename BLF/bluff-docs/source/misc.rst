=======================
Miscellaneous functions
=======================


This document is just for whatever utility functions BLUFF provides that *are*
exported to the global scope, as opposed to the global scope. Variables aren't
included here because you'll find them in :doc:`namespace`. Generally speaking,
most functions you use will be methods of a class.


.. js:function:: getQueryParams(queryString)
   
   Returns an object that represents the given URL's query parameters. You could
   certainly do any checking manually, but this makes it a little simpler. It
   will work using semicolons (;) *or* ampersands (&) as separators. If the
   queryString argument begins with a question mark (?), it's ignored. You don't
   need to use this function for the current page's URL, the values for that are
   already provided in :js:data:`queryParams`.
   
   For example, "action=profile;u=137607" would result in:
   
   .. code-block:: json

      {
          "action": "profile",
          "u": "137607"
      }
   