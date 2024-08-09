This app/widget is designed for people who have ADHD symptoms: 
- highly distractable
- time blindness
- weak executive function

This widget makes you time aware, so that hopefully you make the right decision about your time. 

For this to work, you need to use clockify. I am not affiliated with clockify. They have a free plan and their API is accessible for free. So I use it. 

The widget is build using nextjs. 

The widget shows "max possible output" doable in a day, assuming you are trying to finish your work by 5pm. 

The idea is - when you decide to watch youtube video(a distraction) in the middle of the day, you should be able to see your max possible output shrinking.. that should act as feedback to help you get back to work. 

ADHD is charectorized by `time blindness`, `weak executive functions`, `distractability`, `weak working memory` among others. This widget helps only with `time blindness` during working hours. Thats it ! You will have to solve for the other problems seperately. 

Best used as a chrome app. Open `localhost:3004` on browser. `Save and share`->`install page as app`. Resize window to smallest size possible. All the best. 

## Demo

[![Loom Video](https://cdn.loom.com/sessions/thumbnails/519e4a0c1b1f4916aa1e5013b939fd87-6726577a5fbce6e3-full-play.gif)](https://www.loom.com/share/519e4a0c1b1f4916aa1e5013b939fd87)

## Getting Started

First, run the development server:

```bash {"id":"01J4V6QAQZC005W3RCZWYPYA4E"}
npm install
npm run dev
```

## Environment variables

`.env.sample` - contains environment variables that you will need to use. 

rename `.env.sample` to `.env.local` to get started. 

configure the following from clockify
```
CLOCKIFY_APIKEY="" #api key from clockify
CLOCKIFY_USER="" #user id from clockify
CLOCKIFY_WORKSPACE="" # workspace id from clockify
```