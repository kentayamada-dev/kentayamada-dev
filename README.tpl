<p align=center><img src=static/live_japan.gif width="100%" /></p>

{% for _, obj in live_cam_list.items() %}
<table>
  <tr>
    <th colspan=4 align=center>
      {{ obj["name"]["ja"] }}<br />
      {{ obj["name"]["en"] }}
    </th>
  </tr>
  <tr>
    <th align=center>
      <img src={{ obj["weather"]["icon_url"] }} alt="{{ obj["name"]["en"] }} Weather Icon">
    </th>
    <th align=center>
      <img src=static/weathers/thermometer.svg alt="Temperature Icon" width="60px" />
      <br />
      {{ obj["weather"]["temperature"] }}°C
    </th>
    <th align=center>
      <img src=static/weathers/raindrop-measure.svg alt="Humidity Icon" width="60px" />
      <br />
      {{ obj["weather"]["humidity"] }}
    </th>
    <th align=center>
      <img src={{ 'static/weathers/windsock.svg' if obj["weather"]["wind"] >= '5' else 'static/weathers/windsock-weak.svg' }} alt="Wind Icon" width="60px" />
      <br />
      {{ obj["weather"]["wind"] }}m/s
    </th>
  </tr>
  <tr>
{%- for _, city in obj["cities"].items() %}
    <th colspan=2 align=center>
      {{ city["name"]["ja"] }}<br />
      {{ city["name"]["en"] }}
    </th>
{%- endfor %}
  </tr>
  <tr>
{%- for _, city in obj["cities"].items() %}
    <td colspan=2 align=center>
      &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;<br />
      <img src={{ city["yt"]["img_path"] }} alt="{{ city["name"]["ja"] }}・{{ city["name"]["en"] }}"><br />
      &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;
    </td>
{%- endfor %}
  </tr>
</table>
{% endfor %}

-----------------------------------------------------------------------------
<p align=center>
  Last Updated: {{ updated_date }} (JST)<br />
  Update Cycle: 10 min
</p>
<div align=center>

  [![CI](https://img.shields.io/github/workflow/status/kentayamada-dev/kentayamada-dev/CI?label=CI&logo=GitHub)](https://github.com/kentayamada-dev/kentayamada-dev/actions/workflows/ci.yml)
</div>
