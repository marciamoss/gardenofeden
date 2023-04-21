**Deployed App https://gardenofeden.vercel.app/**

gardeOfEden is an application promoting the importance of planting trees to help renew resources lost to mass deforestation.

The application is developed with **React, Redux Toolkit Query, Firebase passwordless login, Filestack** for image processing.

# Design:

- The application uses google firebase secure passwordless login which only requires the users email and the user login by clicking in the link sent to their email.
- Users can register and upload pictures of their own trees.
- Geotags embedded in uploaded pictures are used to locate the trees on the map.
- When geotag data is not available, users can pin the tree directly on the map or enter an approximate address and the google map pins it for them.
- Users can add a short intro statement about themselves and upload a profile picture if they like.
- Each tree can be cataloged with the date planted, a name or statement.
- If logged in the current user trees icon displays different from other trees on the map on homepage.
- The user trees can be edited directly from main page by clicking the edit icon when the user tree is clicked.
- For Non user trees connect button is visible which will be used to connect to other users, currently its a dummy form, functionality will be added in futre.
- Both 'Edit' and 'Connect' icon disappears when logged out but user can still see the tree popups when clicked with minimum details.

This project is adapted from a group project that I was part of couple of years ago during coding bootcamp course.

This is the original project: https://github.com/ralracish/goTreeUrself
