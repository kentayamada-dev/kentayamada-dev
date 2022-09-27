<p align="center"><img src="static/live_japan.gif" width="100%"></p>

<table>
   <thead>
      <tr>
         <th colspan="4" align="center">北海道<br>Hokkaido</th>
      </tr>
      <tr>
         <th colspan="2" align="center">函館<br>Hakodate</th>
         <th colspan="2" align="center">札幌<br>Sapporo</th>
      </tr>
      <tr>
         <th align="center"><img src="{{ live_cam_list["hakodate"]["icon_url"] }}" alt="weather icon" width="70px"></th>
         <th align="center">
            <h3>{{ live_cam_list["hakodate"]["temperature"] }}°C</h3>
         </th>
         <th align="center"><img src="{{ live_cam_list["sapporo"]["icon_url"] }}" alt="weather icon" width="70px"></th>
         <th align="center">
            <h3>{{ live_cam_list["sapporo"]["temperature"] }}°C</h3>
         </th>
      </tr>
   </thead>
   <tbody>
      <tr>
         <td colspan="2" align="center"><img src="assets/{{ live_cam_list["hakodate"]["img"] }}" alt="函館・Hakodate" width="500px"></td>
         <td colspan="2" align="center"><img src="assets/{{ live_cam_list["sapporo"]["img"] }}" alt="札幌・Sapporo" width="500px"></td>
      </tr>
   </tbody>
</table>

<table>
   <thead>
      <tr>
         <th colspan="4" align="center">東京<br>Tokyo</th>
      </tr>
      <tr>
         <th colspan="2" align="center">渋谷<br>Shibuya</th>
         <th colspan="2" align="center">汐留<br>Shiodome</th>
      </tr>
      <tr>
         <th align="center"><img src="{{ live_cam_list["shibuya"]["icon_url"] }}" alt="weather icon" width="70px"></th>
         <th align="center">
            <h3>{{ live_cam_list["shibuya"]["temperature"] }}°C</h3>
         </th>
         <th align="center"><img src="{{ live_cam_list["shiodome"]["icon_url"] }}" alt="weather icon" width="70px"></th>
         <th align="center">
            <h3>{{ live_cam_list["shiodome"]["temperature"] }}°C</h3>
         </th>
      </tr>
   </thead>
   <tbody>
      <tr>
         <td colspan="2" align="center"><img src="assets/{{ live_cam_list["shibuya"]["img"] }}" alt="渋谷・Shibuya" width="500px"></td>
         <td colspan="2" align="center"><img src="assets/{{ live_cam_list["shiodome"]["img"] }}" alt="汐留・Shiodome" width="500px"></td>
      </tr>
   </tbody>
</table>

<table>
   <thead>
      <tr>
         <th colspan="4" align="center">大阪府<br>Osaka</th>
      </tr>
      <tr>
         <th colspan="2" align="center">道頓堀<br>Dotonbori</th>
         <th colspan="2" align="center">大阪市<br>Osaka</th>
      </tr>
      <tr>
         <th align="center"><img src="{{ live_cam_list["dotonbori"]["icon_url"] }}" alt="weather icon" width="70px"></th>
         <th align="center">
            <h3>{{ live_cam_list["dotonbori"]["temperature"] }}°C</h3>
         </th>
         <th align="center"><img src="{{ live_cam_list["osaka"]["icon_url"] }}" alt="weather icon" width="70px"></th>
         <th align="center">
            <h3>{{ live_cam_list["osaka"]["temperature"] }}°C</h3>
         </th>
      </tr>
   </thead>
   <tbody>
      <tr>
         <td colspan="2" align="center"><img src="assets/{{ live_cam_list["dotonbori"]["img"] }}" alt="道頓堀・Dotonbori" width="500px"></td>
         <td colspan="2" align="center"><img src="assets/{{ live_cam_list["osaka"]["img"] }}" alt="大阪市・Osaka" width="500px"></td>
      </tr>
   </tbody>
</table>

<table>
   <thead>
      <tr>
         <th colspan="4" align="center">沖縄<br>Okinawa</th>
      </tr>
      <tr>
         <th colspan="2" align="center">かりゆしビーチ<br>Kariyushi Beach</th>
         <th colspan="2" align="center">石垣島<br>Ishigaki Island</th>
      </tr>
      <tr>
         <th align="center"><img src="{{ live_cam_list["kariyushi"]["icon_url"] }}" alt="weather icon" width="70px"></th>
         <th align="center">
            <h3>{{ live_cam_list["kariyushi"]["temperature"] }}°C</h3>
         </th>
         <th align="center"><img src="{{ live_cam_list["ishigaki"]["icon_url"] }}" alt="weather icon" width="70px"></th>
         <th align="center">
            <h3>{{ live_cam_list["ishigaki"]["temperature"] }}°C</h3>
         </th>
      </tr>
   </thead>
   <tbody>
      <tr>
         <td colspan="2" align="center"><img src="assets/{{ live_cam_list["kariyushi"]["img"] }}" alt="かりゆしビーチ・Kariyushi Beach" width="500px"></td>
         <td colspan="2" align="center"><img src="assets/{{ live_cam_list["ishigaki"]["img"] }}" alt="石垣島・Ishigaki Island" width="500px"></td>
      </tr>
   </tbody>
</table>

-----------------------------------------------------------------------------
<p align="center">Last Updated: {{ updated_date }} (JST)<br>Update Cycle: Every 30 min</p>
<div align="center">
   [![CI](https://img.shields.io/github/workflow/status/kentayamada-dev/kentayamada-dev/CI?label=CI&logo=GitHub)](https://github.com/kentayamada-dev/kentayamada-dev/actions/workflows/ci.yml)
</div>
