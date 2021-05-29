# GridxPlanner

- [GridxPlanner](#gridxplanner)
  - [Distinctiveness and Complexity](#distinctiveness-and-complexity)
    - [Why this project? What's the point of planning your Instagram posts?](#why-this-project-whats-the-point-of-planning-your-instagram-posts)
    - [The Grid](#the-grid)
    - [Team Collaboration](#team-collaboration)
    - [Client Preview and Feedback](#client-preview-and-feedback)
  - [Files](#files)
    - [Django Files](#django-files)
    - [React Frontend Files](#react-frontend-files)
  - [How to run](#how-to-run)
    - [Frontend - React](#frontend---react)
    - [Backend - Django](#backend---django)
  - [Other info](#other-info)

## Distinctiveness and Complexity

My final project GridxPlanner is a collaborative instagram planner designed specifically for social media managers and digital agency teams. Similar applications in the market is [Later](https://later.com/) and [Planoly](http://planoly.com/).

### Why this project? What's the point of planning your Instagram posts?

- Millions of people browse Instagram daily and businesses use this platform to build a relationship with their customers and potential customers. This can ultimately, directly or indirectly, help them sell their products and services.
- How do they do that? By strategically planning their posts.
- As a social media manager who have worked with businesses and digital agencies, collaboration is a big part of this process.
- In a digital agency, several people may work on the same account, one person would curate and schedule the images and a writer would create the caption.
- A solo social media manager may do all the work by themselves but they still have to get their client's feedback and approval before the posts go live.

The following is the application's features that would show its distinctiveness and complexity:

### The Grid

- Users can add images to a 3-columned grid similar to what you see on Instagram but they are able to plan and re-arranged the images by dragging and dropping them
- The grid can be found in the Planner page
- Users can also edit the details in each image post by clicking it. They will be taken to the image details page and they can add the status, schedule of when it will be posted, caption and hashtags

### Team Collaboration

- Each user can create "accounts" which correspond to each Instagram account they are planning for. Each account will have their own team.
- List of user's accounts and corresponding team can be found in the Settings page
- The owner of the account can then add other users to the account's team.
- Users who are part of the account's team will have access to the grid and edit the images and their details.

### Client Preview and Feedback

- On the Share page there is a preview link that can be shared to clients so they preview the grid and image details.
- The client using the preview link can go to each image's detail page  not only to preview the details but also add their feedback on that particular post by leaving a comment.
- The team, when they go to edit in the image details page can see the comments left by the clients and adjust the details accordingly.
- The team can also leave their own comments stating that they have already applied the needed changes

## Files

This would be a long section.

```bash
GridxPlan
└──frontend 
│   └───build #where frontend build output is
│   └───src
│   │    └───assets #static assets like logos
│   │    └───components #React components
│   │    └───data #redux store files and fetch() wrapper
│   │    └───pages #React components for each app page
│   │    └───reducers #files for redux reducers
│   │    └───styles #css modules
│   │    └───utils #item types for drag and drop (reactdnd)
│   │    │   
│   │    │   App.css #css that affects the whole application
│   │    │   App.js #The main React App and page routes are defined
│   │    │   ...
│
└──GridxPlan 
└──media #media folder where uploaded images go
└──planner #app folder
│   │   api.py
│   │   models.py
│   │   urls.py
│   │   views.py
│   │   ...
│   ...
```

### Django Files

**models.py**

- Describes the 6 models that I use and some helper functions
- User - user accounts for the GridxPlanner app
- Account - the instagram account a user would like to plan for. User can have multiple accounts. Each account has a corresponding team.
- Team - a team is automatically created when an account is created. It has an owner and members.
- Cell - each cell is associated with an account. A cell contains an image and its position in the grid. Each cell has a corresponding post.
- Post - a post is automatically created when a cell is created. It contains the details of a post like the status, schedule, caption and hashtags
- Comment - the comments made during preview of the posts

**urls.py**

- defines the urls of the different views and APIs
- specific pages of the app is managed in the frontend using React Router

views.py

- serves the index, login_view, logout_view and register

api.py

- team
    - api/team/<str:account>
    - GET - fetch all the team members of an account
    - POST - add a new team member
- account
    - api/accounts
    - GET - fetching accounts that is associated with the logged in user
    - POST - add a new account
- grid
    - api/grid/<str:account>
    - GET - fetch all the cells associated with an account
    - PUT - moving/changing a cell's position
- post
    - api/post/<int:post_id>
    - GET - fetch a post's details
- update_post
    - api/post/edit/<int:post_id>
    - PUT - update post details like status, schedule, caption, and hashtags
- add_image
    - api/post/add
    - POST - add a new cell
- comments
    - api/comments/<int:post_id>
    - GET - fetch the comments associated with a post
    - POST - add a new comment to a post

### React Frontend Files

```bash
frontend 
└───build #where frontend build output is
└───src
│    └───assets #static assets like logos
│    └───components #React components
│    └───data #redux store files and fetch() wrapper
│    └───pages #React components for each app page
│    │     │   ClientPostPreview.js
│    │     │   ClientPreview.js
│    │     │   EditPost.js
│    │     │   GridGallery.js
│    │     │   Settings.js
│    │     │   Share.js
│    └───reducers #files for redux reducers
│    └───styles #css modules
│    └───utils #item types for drag and drop (reactdnd)
│    │   
│    │   App.css #css that affects the whole application
│    │   App.js #The main React App and page routes are defined
```

**GridGallery.js**

- The page that contains the 3-columned grid and dragging and dropping is defined.
- Uses [react-dnd](https://react-dnd.github.io/react-dnd/about) and its wrapper library [react-dnd-multi-backend](https://louisbrunner.github.io/dnd-multi-backend/packages/react-dnd-multi-backend/) to implement the drag and drop functionality of the cells
- This component serves as the DnD provider where the items can be dragged and dropped. It contains the GridImage component which is the draggable item

**EditPost.js**

- Edit post page has 2 main parts, the EditPostForm and the PostPreview
- EditPostForm - provides the form for editing the details of a post
- PostPreview - shows the preview of the post the a client sees when they get their preview link. User will also see the comments left by the client and add their own comments.

**Settings.js**

- Settings page show the list of accounts and the corresponding team of the current account and the functionality of adding new accounts and new team members.
- ListAccount - lists the accounts associated with the logged in user. Current account is in bold
- AddAccount - handles adding of an account by username
- ListTeam - lists the team of the current account
- AddTeamMember - handles adding of a new team member to the current account by email. Only existing users can be added as a team member
- Logout button is also here

**Share.js**

- Share page shows the preview link for the current account that can be shared with clients

**ClientPreview.js**

- This is what clients will see when they go to the preview link from the Share page.
- It shows a 3-column grid of images similar to what grid gallery page shows but it's not drag-and-drop-able
- Images can still be clicked and they'll be taken to the preview page of each post

**ClientPostPreview.js**

- This page show the preview of the post details like the status, schedule, caption and hashtags
- This is also where the comments are shown and a form for adding comments

```bash
frontend 
└───build #where frontend build output is
└───src
│    └───assets #static assets like logos
│    └───components #React components
│    │     │   AddAccount.js
│    │     │   AddTeamMember.js
│    │     │   BottomMenu.js
│    │     │   EditPostForm.js
│    │     │   GridImage.js
│    │     │   ImageUpload.js
│    │     │   
│    │     │   ListAccounts.js
│    │     │   ListTeam.js
│    │     │   Nav.js
│    │     │   PostBar.js
│    │     │   PostPreview.js
│    │     │   PostPreviewBar.js
│    │     │   TopBar.js
│    └───data #redux store files and fetch() wrapper
│    └───pages #React components for each app page
│    └───reducers #files for redux reducers
│    └───styles #css modules
│    └───utils #item types for drag and drop (reactdnd)
│    │   
│    │   App.css #css that affects the whole application
│    │   App.js #The main React App and page routes are defined
```

**Nav.js**

- Component for the navigation bar. It is composed of the TopBar.js and BottomMenu.js

**TopBar.js**

- Right now it only contains the GridxPlanner Logo
- I initially planned to have more buttons but I decided to simplify the app for now

**BottomMenu.js**

- It has icons for the different pages planner icon for the GridGallery, share icon for the Share page, gear icon for the Settings page.
- Image icon for adding a new cell/image is another component ImageUpload.js

**ImageUpload.js**

- The image icon is associated with an input with a type of file. When the file is selected a POST request to send the image to the API is made.

**ListAccount.js**

- Fetches the list of accounts associated with the user by dispatching a redux thunk
- Lists the accounts with the current account on bold
- The accounts can be clicked to switch the current account by dispatching a redux action

**AddAccount.js**

- Have an input with a type of text for adding a new account
- Dispatches a redux thunk that sends a POST request to the backend to create the new account upon enter

**ListTeam.js**

- Fetches the list of team members of the current account by dispatching a redux thunk
- Lists the team members of the current account

**AddTeamMember.js**

- Have an input with a type of text for adding a new team member to the current account
- Dispatches a redux thunk that sends a POST request to the backend to create the new team member upon enter

**GridImage.js**

- The draggable component in GridGallery that shows the image

**EditPostForm.js**

- Provides the form where the post details provided by EditPost can be edited

**PostBar.js**

- Handles the saving of the edited post details in EditPostForm

**PostPreview.js**

- Show the preview of the post details
- Provides the input form for adding comments to the post

**PostPreviewBar.js**

- Provides a 'back' button so client can go back to the grid preview after looking at each pots's details preview

```bash
frontend 
└───build #where frontend build output is
└───src
│    └───assets #static assets like logos
│    └───components #React components
│    └───data #redux store files and fetch() wrapper
│    │     │   client.js
│    │     │   store.js
│    │     │   types.js
│    └───pages #React components for each app page
│    └───reducers #files for redux reducers
│    └───styles #css modules
│    └───utils #item types for drag and drop (reactdnd)
│    │     │   items.js
│    │   
│    │   App.css #css that affects the whole application
│    │   App.js #The main React App and page routes are defined
```

**client.js**

- a fetch wrapper to replace axios and work with redux thunk
- A slightly modified version of the wrapper borrowed from [Kent C. Dodds](https://kentcdodds.com/blog/replace-axios-with-a-simple-custom-fetch-wrapper)

**store.js**

- configuration for the redux store

**types.js**

- defines the types of draggable object
- [Needed for react-dnd to work](https://react-dnd.github.io/react-dnd/docs/overview#items-and-types)

items.js

- defines the item types of draggable object
- [Needed for react-dnd to work](https://react-dnd.github.io/react-dnd/docs/overview#items-and-types)

```bash
frontend 
└───build #where frontend build output is
└───src
│    └───assets #static assets like logos
│    └───components #React components
│    └───data #redux store files and fetch() wrapper
│    └───pages #React components for each app page
│    └───reducers #files for redux reducers
│    │     │   accountsSlice.js
│    │     │   gridSlice.js
│    │     │   teamSlice.js
│    └───styles #css modules
│    └───utils #item types for drag and drop (reactdnd)
│    │   
│    │   App.css #css that affects the whole application
│    │   App.js #The main React App and page routes are defined
```

**accountsSlice.js**

- Defines the state, reducers, actions and thunks for data concerning accounts
- States:
    - accounts
    - currentAccount
- Reducers/Actions:
    - switchAccount
    - fetchAccounts
    - addAccount

**gridSlice.js**

- Defines the state, reducers, actions and thunks for data concerning cells and posts
- States:
    - posts
- Reducers/Actions:
    - addCell
    - fetchPosts
    - moveCell

**teamSlice.js**

- Defines the state, reducers, actions and thunks for data concerning the team of the current account
- States:
    - members
- Reducers/Actions:
    - fetchTeamMembers
    - addTeamMember

## How to run

The backend is Django and the frontend is made with React. 

A live demo is hosted here:

But in case you want to run it yourselves, here's how.

### Frontend - React

I have already done the build for the frontend part so hopefully you wouldn't have to. But in case it's needed. This is how to install the dependencies and build the app.

1. Install [node.js](https://nodejs.org/en/download/)
2. Install [npm](https://www.npmjs.com/get-npm)
3. Install the dependencies. Go to GridxPlan/frontend/

```bash
npm install
```

4. build it

```bash
npm run build
```

### Backend - Django

1. Create [virtualenv](https://uoa-eresearch.github.io/eresearch-cookbook/recipe/2014/11/26/python-virtual-env/) (If you want. Highly recommended). Activate your virtualenv
2. Install dependencies

```bash
pip install -r requirements.txt
```

3. Build the database. Go to the main GridxPlan folder

```bash
python3 manage.py makemigrations
python3 manage.py migrate
```

4. Run the server

```bash
python3 manage.py runserver
```

*python3 command just indicate that I have used `python3` the command might be different in your computer and might potentially just be `python`

## Other info

Here's the initial Figma design mockup that I made. It didn't turn out exactly as I first designed it since I simplified it and removed some of the other features:

[https://www.figma.com/file/Z6u6hEoJGukOcn9BJIufyG/GridX-First-Iteration?node-id=228%3A0](https://www.figma.com/file/Z6u6hEoJGukOcn9BJIufyG/GridX-First-Iteration?node-id=228%3A0)