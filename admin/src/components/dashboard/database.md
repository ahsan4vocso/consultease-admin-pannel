Public_Profile table with some of the there data...

 id  |       document_id        |      name      |  role  |   mobile   |       created_at        |       updated_at        |      published_at       | created_by_id | updated_by_id | locale |      email       | is_live |                                                                firebase_tokens                                                                 | referrer_code |                                          address_json
-----+--------------------------+----------------+--------+------------+-------------------------+-------------------------+-------------------------+---------------+---------------+--------+------------------+---------+------------------------------------------------------------------------------------------------------------------------------------------------+---------------+-------------------------------------------------------------------------------------------------
 100 | f2r5vh5d8vg58k6cf5qj9m85 |                | Client | 9599460947 | 2025-12-05 20:24:21.638 | 2025-12-05 20:24:22.334 | 2025-12-05 20:24:22.33  |               |               |        |                  | f       | eyY-wmffR3SosryiFrQ5-J:APA91bEo56-QLqjgOomcKtZIls359WGaP_Rz6VBOgD34P3azln9o_pEPOyF2nG00BK7Vc4AuNwJ6WpnXEG0iyBBUITeeEQzWw7cDk9SHObGr_oycwkNrM9U |               |
 105 | n4vzp4ofqewrkk9wyq0hl8ys | Hero           | Expert | 9053822756 | 2025-12-08 22:28:51.29  | 2025-12-09 11:11:56.394 | 2025-12-09 11:11:56.39  |               |               |        | Hh@gmaik.com     | f       | e3D6so7lSsuRYVYIf5kxsS:APA91bHU7oA7BYZSrs7XVZBJ7PO4ykVhscC1TeulpXHDkAO_aNhCNQsG4HjjKDSnDRLWHt-YrUy3NdD0H7B8zK9G6znQ84Iy5WZAy3YdJUlN7gNIvhIoO1s |               | {"city": "", "state": "Chandigarh", "country": "India", "district": "Basti", "postalCode": ""}
 103 | r5adqtbjpky7r9nkz7c5z2jo | Varsha Gupta   | Expert | 9958219872 | 2025-12-06 16:54:57.742 | 2025-12-06 17:05:17.282 | 2025-12-06 17:05:17.272 |               |               |        | varsha@vocso.com | f       | eO1t_KvuSXm19YxySfdRYN:APA91bFFQxSZcxVVBm1VR651ns3VGRWFeHMhLgKONEJ--JSPXQ3gD45CJmEj1RiVOzbaw0rJnQtOZ29_5W_80rJsitm-K1y6Ev3d9DYLDIr17N_5BsTn1ME |               | {"city": "", "state": "Haryana", "country": "India", "district": "Faridabad", "postalCode": ""}
 102 | ibkrmcmw99gzx9mziqb9mai3 | Prem Chand     | Expert | 9811432552 | 2025-12-06 16:54:38.662 | 2025-12-06 17:05:44.892 | 2025-12-06 17:05:44.888 |               |               |        | prem.c@vocso.com | f       | f6rm4WHtRmK6j42T-dvArx:APA91bHqB3bjwLx7spavpTeW36zGl2Y4HyfqVZn1K2_E8GxTeuat_s3qAojTmrWvPKQ77VQnM2axKyOxm_xXjV19qAiHaTGkqoVIOlCwMBxKvkJLJOyUfhc |               | {"city": "", "state": "Haryana", "country": "India", "district": "Faridabad", "postalCode": ""}
  98 | ycv28e7qcmkprx2ipqjafcoq | Deepak Chauhan | Client | 9818238348 | 2025-12-05 17:15:41.443 | 2025-12-09 16:34:09.938 | 2025-12-09 16:34:09.933 |               |               |        | deepak@vocso.com | f       | fWZSNTjASnOIg7_BoCxOyN:APA91bGW31AjlBvONak5IojgBR6QS1tR9hfUKuGBx8Yzlni-log_mevtyKcmS2ekW0tBnW61kReSXEHZgTstyZDue4DgPhbcoW2Z_GbTq8at2Fc7NFtC4Io |               | {"city": "", "state": "Haryana", "country": "India", "district": "Faridabad", "postalCode": ""}

this is accessible as localhost:1337/api/public-users (strapi route)



Expert_profile table with some of the there data...

 id  |       document_id        |       created_at        |       updated_at        |      published_at       | created_by_id | updated_by_id | locale |  descriptions  |   tagline    |     handler     | average_rating | review_count | is_verified | vocation_mode | call_any_time | is_active |       website       | rank_factor | is_approved
-----+--------------------------+-------------------------+-------------------------+-------------------------+---------------+---------------+--------+----------------+--------------+-----------------+----------------+--------------+-------------+---------------+---------------+-----------+---------------------+-------------+-------------
 155 | h7neknkm2445t1au0jx5o1hq | 2025-12-05 17:29:25.034 | 2025-12-08 15:20:42.543 | 2025-12-08 15:20:42.539 |               |               |        | Tax litigation | Gst          | Sakshi          |           5.00 |            1 | f           | f             | t             | t         | Sakshi.gstreturns   |        0.30 | t
 156 | e6snhtxqo4rca7po0fuh0rvw | 2025-12-06 16:56:03.796 | 2025-12-06 17:35:00.17  | 2025-12-06 17:35:00.166 |               |               |        | Hiring         | Hiring       | Human Resources |           3.00 |            1 | f           | f             | t             | t         | vocso.com           |        0.18 | t
 158 | wg4ijgb37rr5us647hp88tco | 2025-12-08 22:30:20.174 | 2025-12-08 22:31:08.921 | 2025-12-08 22:31:08.917 |               |               |        | Hehushs        | Hhejirh      | Happy           |                |              | f           | f             | t             | t         |                     |        0.00 | f
 151 | i3aakqup7538djp8g2sw3rm6 | 2025-11-15 18:40:50.478 | 2025-12-08 10:33:32.235 | 2025-12-08 10:33:32.231 |               |             4 |        | Gdysv          | React native | Amandeepz       |           4.60 |           11 | t           | f             | t             | t         |                     |        0.31 | t
 154 | k2g1q090613ec8qi4adw0kep | 2025-12-05 16:39:07.887 | 2025-12-05 17:14:19.527 | 2025-12-05 17:14:19.522 |             4 |             4 |        | Admin          | Admin        | Admin           |                |              | t           | f             | t             | t         | www.consultease.com |        0.00 | t



this is accessible as localhost:1337/api/expert-profiles (strapi route)


calls table with some of the there data...

 id  |       document_id        |       start_time        |        end_time         |   type    | total_cost | call_status |       channel_name        |       created_at        |       updated_at        |      published_at       | created_by_id | updated_by_id | locale | duration | duration_sec
------+--------------------------+-------------------------+-------------------------+-----------+------------+-------------+---------------------------+-------------------------+-------------------------+-------------------------+---------------+---------------+--------+----------+--------------
 4309 | guws0jivccvcigiaksei86k9 |                         | 2025-12-08 14:52:58.594 | videoCall |       0.00 | declined    | call_83_76_1765185768726  | 2025-12-08 14:52:48.734 | 2025-12-08 14:53:00.431 | 2025-12-08 14:53:00.401 |               |               |        |     0.00 |         0.00
 4157 | a8wjv7p9kna1modkfnakagwm | 2025-12-05 17:38:41.681 | 2025-12-05 17:38:43.257 | voiceCall |      10.00 | completed   | call_98_99_1764936492683  | 2025-12-05 17:38:12.693 | 2025-12-05 17:38:43.907 | 2025-12-05 17:38:43.893 |               |               |        |     0.02 |         1.20
 4177 | knrydit1vpcy424052by3bk2 | 2025-12-06 12:47:04.707 | 2025-12-06 12:47:19.494 | voiceCall |      10.00 | completed   | call_76_83_1765005420381  | 2025-12-06 12:47:00.387 | 2025-12-06 12:47:20.872 | 2025-12-06 12:47:20.854 |               |               |        |     0.23 |        13.80
 4198 | lnkpfdfp22r4vpvfy9j9v9n9 | 2025-12-06 13:53:47.447 | 2025-12-06 13:53:57.352 | voiceCall |      12.00 | completed   | call_83_76_1765009422480  | 2025-12-06 13:53:42.496 | 2025-12-06 13:53:57.351 | 2025-12-06 13:53:57.334 |               |               |        |     0.15 |         9.00
 4158 | hmtaw7qha3my7ub4ho6kfpet | 2025-12-05 17:40:14.159 | 2025-12-05 17:40:46.347 | voiceCall |      10.00 | completed   | call_98_83_1764936600426  | 2025-12-05 17:40:00.434 | 2025-12-05 17:40:46.426 | 2025-12-05 17:40:46.412 |               |               |        |     0.53 |        31.80

 here the call_status is enum of (pending, ongoing, completed, declined, missed, busy)
 and use duration (stored val in minutes) instead of duration_sec

 this table liked with tables Public_Profile in strapi and named in table as caller and table Public_Profile in strapi and named in table as receiver and table Public_Profile in strapi and named in table as expert call_ended_by.

To fetch from strapi is localhost:1337/api/calls (you can use any strapi query params to fetch data like sort, filters etc)



reviews table with some of the there data...

 id |       document_id        | rating | comments |       created_at        |       updated_at        |      published_at       | created_by_id | updated_by_id | locale
----+--------------------------+--------+----------+-------------------------+-------------------------+-------------------------+---------------+---------------+--------
 80 | ig7ortmlqchzy7e7nixpzovk |   1.00 | Fru      | 2025-05-30 16:22:17.15  | 2025-05-30 16:22:17.15  | 2025-05-30 16:22:17.141 |               |               |
 81 | mvm6lo3szarbn0s7j823sere |   3.00 | Ghsbdbdn | 2025-06-03 12:44:30.574 | 2025-06-03 12:44:30.574 | 2025-06-03 12:44:30.566 |               |               |
 82 | svzptodpxktldqcnk3reo3sx |   6.00 | GOAT     | 2025-09-04 18:23:04.629 | 2025-09-04 18:23:04.629 | 2025-09-04 18:23:04.617 |             4 |             4 |
 83 | fcancpcs3gdypsy8tth993h6 |   0.00 |          | 2025-09-08 12:59:24.745 | 2025-09-08 12:59:24.745 | 2025-09-08 12:59:24.737 |               |               |
 84 | gd88rabe19r9o7fu0ypekj59 |   5.00 |          | 2025-09-08 13:18:00.418 | 2025-09-08 13:18:00.418 | 2025-09-08 13:18:00.41  |               |               |


this table liked with tables Public_Profile in strapi and named in table as users and table Expert_Profile in strapi and named in table as experts

http://localhost:1337/api/reviews