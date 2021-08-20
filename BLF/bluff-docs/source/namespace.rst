===================
Namespace variables
===================


This is a description of values added to the :js:data:`window.bluff` object.
Also, in case you don't know, :js:data:`window` is the global scope. So,
:js:data:`document` is technically :js:data:`window.document`. What I'm saying
is, you can access the BLUFF namespace without adding "window." in front of it.


.. js:data:: pageType
   
   This is a relatively complex object created by :js:func:`getPageType`, used
   to describe what kind of page you are on. Values that are not relevant are
   **not defined**. Thankfully, due to the way JavaScript works, undefined
   values evaluate to false, so ``if (pageType.undefinedExample) {}`` will turn
   up false, and the code block will not be executed. Values that *are* relevant
   are either another object or `true`, and in either case, such an if statement
   will evaluate to true, and the code will run.
   
   Here are all of the possible values for this object:
   
   - topic
   
     - locked
     - poll
     - pollLocked
     
   - post
   - board
   - profile
   
     - summary
     - stats
     - posts
     - accountSettings
     - profileSettings
     - layoutSettings
     - notificationSettings
     - pmSettings
     
   - search
   - index
   - other
     (anything that doesn't fit anywhere else. may eventually cease to exist)
   
   .. : I wish I didn't need all those ridiculous blank spaces, but alas.
   
   Am I missing anything?
   I'm also considering a different way to name the settings values in the
   profile object. Something shorter. Maybe like sAccount, for example? That
   also has the advantage of it being clear that it's a settings page as soon
   as you start reading the name.


.. js:data:: queryParams
   
   This is a simple object representing the values in the URL's query string.
   It's an example of the output from :js:func:`getQueryParams`, and the format
   for it is described there.


.. js:data:: sessionId
   
   This is the session ID for the user who is using the userscript (who else
   would it be for??). It gets it from the logout button since that can be found
   on, as far as I know, every single forum page. It's a string. Retrieved with
   :js:func:`getSession`.


.. js:data:: curUserName
   
   What a terrible name for this value! Anyway, it's the username for the user
   who is using the userscript. A string. Retrieved with :js:func:`getUserName`.
   
   I'm thinking about adding a kind of cache. It would keep a certain amount of
   information, so that this could actually be a :js:class:`User` instance,
   rather than just the username, and it would be available on every page. It
   would require the user to open their profile on the first use of the script,
   but that seems like a reasonable requirement for the advantages it may bring.
