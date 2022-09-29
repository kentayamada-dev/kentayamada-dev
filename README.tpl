<p align=center><img src=static/live_japan.gif width="100%" /></p>

<table>
    <tr>
      <th colspan=4 align=center>
        北海道<br />
        Hokkaido
      </th>
    </tr>
    <tr>
      <th align=center>
        <img src={{ live_cam_list["hokkaido"]["weather"]["icon_url"] }} alt="hokkaido weather icon">
      </th>
      <th align=center>
        <img src=static/weathers/thermometer.svg alt="temperature icon" width="60px" />
        <br />
        {{ live_cam_list["hokkaido"]["weather"]["temperature"] }}°C
      </th>
      <th align=center>
        <img src=static/weathers/raindrop-measure.svg alt="humidity icon" width="60px" />
        <br />
        {{ live_cam_list["hokkaido"]["weather"]["humidity"] }}
      </th>
      <th align=center>
        <img src=static/weathers/windsock.svg alt="wind icon" width="60px" />
        <br />
        {{ live_cam_list["hokkaido"]["weather"]["wind"] }}
      </th>
    </tr>
    <tr>
      <th colspan=2 align=center>
        函館<br />
        Hakodate
      </th>
      <th colspan=2 align=center>
        札幌<br />
        Sapporo
      </th>
    </tr>
    <tr>
      <td colspan=2 align=center><img src=assets/{{ live_cam_list["hokkaido"]["cities"]["hakodate"]["yt"]["img"] }} alt="函館・Hakodate" width="500px"></td>
      <td colspan=2 align=center><img src=assets/{{ live_cam_list["hokkaido"]["cities"]["sapporo"]["yt"]["img"] }} alt="札幌・Sapporo" width="500px"></td>
    </tr>
</table>

<table>
    <tr>
      <th colspan=4 align=center>
        東京都<br />
        Tokyo
      </th>
    </tr>
    <tr>
      <th align=center>
        <img src={{ live_cam_list["tokyo"]["weather"]["icon_url"] }} alt="tokyo weather icon">
      </th>
      <th align=center>
        <img src=static/weathers/thermometer.svg alt="temperature icon" width="60px" />
        <br />
        {{ live_cam_list["tokyo"]["weather"]["temperature"] }}°C
      </th>
      <th align=center>
        <img src=static/weathers/raindrop-measure.svg alt="humidity icon" width="60px" />
        <br />
        {{ live_cam_list["tokyo"]["weather"]["humidity"] }}
      </th>
      <th align=center>
        <img src=static/weathers/windsock.svg alt="wind icon" width="60px" />
        <br />
        {{ live_cam_list["tokyo"]["weather"]["wind"] }}
      </th>
    </tr>
    <tr>
      <th colspan=2 align=center>
        渋谷<br />
        Shibuya
      </th>
      <th colspan=2 align=center>
        お台場<br />
        Odaiba
      </th>
    </tr>
    <tr>
      <td colspan=2 align=center><img src="assets/{{ live_cam_list["tokyo"]["cities"]["shibuya"]["yt"]["img"] }}" alt="渋谷・Shibuya" width="500px"></td>
      <td colspan=2 align=center><img src="assets/{{ live_cam_list["tokyo"]["cities"]["odaiba"]["yt"]["img"] }}" alt="お台場・Odaiba" width="500px"></td>
    </tr>
</table>

<table>
    <tr>
      <th colspan=4 align=center>
        大阪府<br />
        Osaka
      </th>
    </tr>
    <tr>
      <th align=center>
        <img src={{ live_cam_list["osaka"]["weather"]["icon_url"] }} alt="osaka weather icon">
      </th>
      <th align=center>
        <img src=static/weathers/thermometer.svg alt="temperature icon" width="60px" />
        <br />
        {{ live_cam_list["osaka"]["weather"]["temperature"] }}°C
      </th>
      <th align=center>
        <img src=static/weathers/raindrop-measure.svg alt="humidity icon" width="60px" />
        <br />
        {{ live_cam_list["osaka"]["weather"]["humidity"] }}
      </th>
      <th align=center>
        <img src=static/weathers/windsock.svg alt="wind icon" width="60px" />
        <br />
        {{ live_cam_list["osaka"]["weather"]["wind"] }}
      </th>
    </tr>
    <tr>
      <th colspan=2 align=center>
        道頓堀<br />
        Dotonbori
      </th>
      <th colspan=2 align=center>
        大阪市<br />
        Osaka
      </th>
    </tr>
    <tr>
      <td colspan=2 align=center><img src=assets/{{ live_cam_list["osaka"]["cities"]["dotonbori"]["yt"]["img"] }} alt="道頓堀・Dotonbori" width="500px"></td>
      <td colspan=2 align=center><img src=assets/{{ live_cam_list["osaka"]["cities"]["osaka"]["yt"]["img"] }} alt="大阪市・Osaka" width="500px"></td>
    </tr>
</table>

<table>
    <tr>
      <th colspan=4 align=center>
        沖縄県<br />
        Okinawa
      </th>
    </tr>
    <tr>
      <th align=center>
        <img src={{ live_cam_list["okinawa"]["weather"]["icon_url"] }} alt="okinawa weather icon">
      </th>
      <th align=center>
        <img src=static/weathers/thermometer.svg alt="temperature icon" width="60px" />
        <br />
        {{ live_cam_list["okinawa"]["weather"]["temperature"] }}°C
      </th>
      <th align=center>
        <img src=static/weathers/raindrop-measure.svg alt="humidity icon" width="60px" />
        <br />
        {{ live_cam_list["okinawa"]["weather"]["humidity"] }}
      </th>
      <th align=center>
        <img src=static/weathers/windsock.svg alt="wind icon" width="60px" />
        <br />
        {{ live_cam_list["okinawa"]["weather"]["wind"] }}
      </th>
    </tr>
    <tr>
      <th colspan=2 align=center>
        かりゆしビーチ<br />
        Kariyushi Beach
      </th>
      <th colspan=2 align=center>
        石垣島<br />
        Ishigaki Island
      </th>
    </tr>
    <tr>
      <td colspan=2 align=center><img src=assets/{{ live_cam_list["okinawa"]["cities"]["kariyushi"]["yt"]["img"] }} alt="かりゆしビーチ・Kariyushi Beach" width="500px"></td>
      <td colspan=2 align=center><img src=assets/{{ live_cam_list["okinawa"]["cities"]["ishigaki"]["yt"]["img"] }} alt="石垣島・Ishigaki Island" width="500px"></td>
    </tr>
</table>

-----------------------------------------------------------------------------
<p align=center>
  Last Updated: {{ updated_date }} (JST)<br />
  Update Cycle: 15 min
</p>
<div align=center>

  [![CI](https://img.shields.io/github/workflow/status/kentayamada-dev/kentayamada-dev/CI?label=CI&logo=GitHub)](https://github.com/kentayamada-dev/kentayamada-dev/actions/workflows/ci.yml)
</div>
