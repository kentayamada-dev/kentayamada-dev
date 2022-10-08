<p align=center><img src=static/live_japan.gif width="100%" /></p>

{% for _, data in weather.items() %}
<table>
  <tr>
    <th colspan=8 align=center>
      {{ data["name"]["ja"] }}<br />
      {{ data["name"]["en"] }}
    </th>
  </tr>
  <tr>
{%- for _, city in data["cities"].items() %}
    <th colspan=4 align=center>
      {{ city["name"]["ja"] }}<br />
      {{ city["name"]["en"] }}
    </th>
{%- endfor %}
  </tr>
  <tr>
{%- for _, city in data["cities"].items() %}
    <th align=center>
      &emsp;&emsp;&emsp;<br />
      <img src=static/weathers/{{ city["weather"]["icon"] }} alt="{{ city["name"]["en"] }} Weather Icon"><br />
      &emsp;&emsp;&emsp;
    </th>
    <th align=center>
      <img src=static/weathers/thermometer.svg alt="Temperature Icon" width="60px" />
      <br />
      {{ city["weather"]["temperature"] }}°C
    </th>
    <th align=center>
      <img src=static/weathers/raindrop-measure.svg alt="Humidity Icon" width="60px" />
      <br />
      {{ city["weather"]["humidity"] }}%
    </th>
    <th align=center>
      <img src=static/wind-directions/{{ city["weather"]["wind_direction"] }}.svg alt="Wind Icon" width="60px" />
      <br />
      {{ city["weather"]["wind"] }}m/s
    </th>
{%- endfor %}
  </tr>
  <tr>
{%- for _, city in data["cities"].items() %}
    <td colspan=4 align=center>
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

<table>
  <tr>
    <th>
      ニュース速報<br />
      Breaking News
    </th>
  </tr>
{% for data in news %}
  <tr>
    <td>
      <a href={{ data["link"] }}>
        <img align=left width=150 src={{ data["image"] }}> {{ data["title"] }}
      </a>
    </td>
  </tr>
{% endfor %}
</table>

-----------------------------------------------------------------------------
<p align=center>
  Last Updated: {{ updated_date }} (JST)<br />
  Update Cycle: 10 min
</p>
<div align=center>

  [![CI](https://img.shields.io/github/workflow/status/kentayamada-dev/kentayamada-dev/CI?label=CI&logo=GitHub)](https://github.com/kentayamada-dev/kentayamada-dev/actions/workflows/ci.yml)
</div>
