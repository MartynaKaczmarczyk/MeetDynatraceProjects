# MeetDynatraceProject - Narodowy Bank Polski, backend oriented task
To start the server, run this command in the backend directory:

`node index.js`

To start the frontend written in react, run this command in the frontend directory:

`npm start`

To query operation 1, run this command (which should have the value 5.2768 as the returning information): 

`curl "http://localhost:3001/average_rate?date=2023-01-02&currency=GBP"`

To find max average rate and min average rate of USD currency in the last 25 days (the output on a day 02.06.2024 is max average: 4.0474 and min average: 3.9149), run the following command:

`curl "http://localhost:3001/min_max_average?currency=USD&quotations=25"`

To find the biggest diffrence between the buy and ask rate of USD currency in the last 25 days (the output on a day 02.06.2024 is 0.08099999999999952), run the following commmand:

`curl "http://localhost:3001/major_difference?currency=USD&quotations=25"`

You can also check out the frontend part.


