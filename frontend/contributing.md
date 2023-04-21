# CONTRIBUTING

## Folder Structure

- `/app`: These are Next.js pages, folder that has brackers () means it contains subfolders represent the route

Ex: `/app/(auth)/signin` will be the `/signin` route

- `/components`: This folder contains components that made up a page. The folder name represents the screen that these components made up. All components in `/Common` is to be reused as best practice

- `/public `: This folder contains static images
- `/interface`: This folder contains TypeScript interface to export

## Folder Naming Convention

- In `/app`, if a folder doesn't have subfolder, DON'T USE brackets, just the name of the route itself as folder

Ex: `/app/dashboard` instead of `/app/(dashboard)`

- To make routing works in Next.js 13, each folder in `/app` needs to have a `page.tsx` that represents the page itself

Ex: `/signin/page.tsx` is where you'll find the code for `/signin` route

- In `/components`, create new folder for each screen you're working on, `UpperCamelCase` folder naming convention

- Each screen folder in `/components` should have a "main" component that will import children components, should name it as `SomethingScreen.tsx` to know its the "main"

Ex: `/DashBoardScreen/DashBoardScreen.tsx` imports its children components such as: `<DailyAffirmation />, <Medication />, <HealthcareNearMe />`

## Before committing

- Add comments on top of the file to explain what the file does
- Verify that you're currently at the `/frontend` folder
- Run `pnpm run format` to format the entire folder to avoid mismatch code style
- Open a PR
