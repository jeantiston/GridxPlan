# GridxPlanner

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
│   │   view.py
│   │   ...
│   ...
```

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