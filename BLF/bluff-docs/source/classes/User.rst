==========
User class
==========


.. js:class:: User(usernameElement, avatarElement, memberId)
   
   This is the class used to represent a user on the forum. You'll probably
   never have a need to construct one of these yourself.
   
   :param Element usernameElement: The element that contains the user's name
   :param Element avatarElement: The element that contains the user's avatar
   :param Number memberId: The member's member ID
   
   The usernameElement argument needs to be an element that contains the user's
   name in its textContent. It's an element rather than the name alone so that
   it can be modified. On profile pages I use the name at the top of the
   profile, and pretty much everywhere else I use the link to their profile,
   which generally contains their name.
   
   The avatarElement argument is an element for similar reasons. However, it is
   optional. If the user doesn't have one, just use :js:data:`null`.
   Conveniently, querySelector() returns null if nothing was found. ;3
   
   memberID, on the other hand, should be an integer. And it should be their
   member ID. It can be found in the URL for their profile or avatar.
   
   .. js:function:: updateInfo(doc)
      
      Updates the information from the user, taking a document as the parameter.
      This was to simplify updating the user from a profile page, whether you're
      currently visiting the page, or got the document from an XMLHttpRequest.
      
      :param Document doc: Document parameter
   
   .. js:function:: getProfileInfo(callback)
      
      Updates the user's information from their profile, automatically. It makes
      an :js:class:`XMLHttpRequest` to the page for their profile, and, like I
      said, automatically updates the :js:class:`User` instance. It takes an
      optional argument for a function that it will call when the request is
      done, if you wanted to do something with the newly retrieved information.
      
      :param function callback: Optional function to call after info is updated