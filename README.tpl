<p align=center><img src=static/live_japan.gif width="100%" /></p>

{% for _, obj in data.items() %}
<table>
  <tr>
    <th colspan=6 align=center>
      {{ obj["name"]["ja"] }}<br />
      {{ obj["name"]["en"] }}
    </th>
  </tr>
  <tr>
{%- for _, city in obj["cities"].items() %}
    <th colspan=3 align=center>
      {{ city["name"]["ja"] }}<br />
      {{ city["name"]["en"] }}
    </th>
{%- endfor %}
  </tr>
  <tr>
{%- for _, city in obj["cities"].items() %}
    <th align=center>
      <img src={{ city["weather"]["icon"] }} alt="{{ city["name"]["en"] }} Weather Icon">
    </th>
    <th align=center>
      <img src=static/weathers/thermometer.svg alt="Temperature Icon" width="60px" />
      <br />
      {{ city["weather"]["temperature"] }}°C
    </th>
    <th align=center>
      <img src=static/weathers/raindrop-measure.svg alt="Humidity Icon" width="60px" />
      <br />
      {{ city["weather"]["humidity"] }}
    </th>
    <th align=center>
      <img src={{ 'static/weathers/windsock.svg' if city["weather"]["wind"] >= '5' else 'static/weathers/windsock-weak.svg' }} alt="Wind Icon" width="60px" />
      <br />
      {{ city["weather"]["wind_direction"] }} {{ city["weather"]["wind"] }}m/s
    </th>
{%- endfor %}
  </tr>
  <tr>
{%- for _, city in obj["cities"].items() %}
    <td colspan=3 align=center>
      &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;<br />
      <img src={{ city["yt"]["img_path"] }} alt="{{ city["name"]["ja"] }}・{{ city["name"]["en"] }}"><br />
      &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;
    </td>
{%- endfor %}
  </tr>
</table>
{% endfor %}

<table>
  <tr>
    <th colspan=4 align=center>
      衛星写真<br />
      Satellite Image
    </th>
  </tr>
  <tr>
    <td colspan=4 align=center>
      &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;<br />
      <img src={{ satellite_image_path }} alt="衛星写真・Satellite Image"><br />
      &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;
    </td>
  </tr>
</table>

-----------------------------------------------------------------------------
<p align=center>
  Last Updated: {{ updated_date }} (JST)<br />
  Update Cycle: 10 min
</p>
<div align=center>

  [![CI](https://img.shields.io/github/workflow/status/kentayamada-dev/kentayamada-dev/CI?label=CI&logo=GitHub)](https://github.com/kentayamada-dev/kentayamada-dev/actions/workflows/ci.yml)
</div>
