<p align=center><img src=static/live_japan.gif width="100%" /></p>

## 天気・Weathers

{% for _, data in weather.items() %}
### {{ data["name"]["ja"] }}・{{ data["name"]["en"] }}

<table>
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
      &emsp;&emsp;&emsp;<br />
      <img src=static/weathers/thermometer.svg alt="Temperature Icon" width="60px" /><br />
      {{ city["weather"]["temperature"] }}°C<br />
      &emsp;&emsp;&emsp;
    </th>
    <th align=center>
      &emsp;&emsp;&emsp;<br />
      <img src=static/weathers/raindrop-measure.svg alt="Humidity Icon" width="60px" /><br />
      {{ city["weather"]["humidity"] }}%<br />
      &emsp;&emsp;&emsp;
    </th>
    <th align=center>
      &emsp;&emsp;&emsp;<br />
      <img src=static/wind-directions/{{ city["weather"]["wind_direction"] }}.svg alt="Wind Icon" width="60px" /><br />
      {{ city["weather"]["wind"] }}m/s<br />
      &emsp;&emsp;&emsp;
    </th>
{%- endfor %}
  </tr>
  <tr>
{%- for _, city in data["cities"].items() %}
    <td colspan=4 align=center>
      <img src={{ city["yt"]["img_path"] }} alt="{{ city["name"]["ja"] }}・{{ city["name"]["en"] }}">
    </td>
{%- endfor %}
  </tr>
</table>
{% endfor %}

## 衛星写真・Satellite Image

<table>
  <tr>
    <td colspan=4 align=center>
      &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;<br />
      <img src={{ satellite_image_path }} alt="衛星写真・Satellite Image"><br />
      &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;
    </td>
  </tr>
</table>

## ニュース・News

### 速報・Flash

<table>
{% for data in flashes %}
  <tr>
    <td width=1000>
      <a href={{ data["link"] }}>
        <img align=left width=150 src={{ data["image"] }}> {{ data["title"] }}
      </a>
    </td>
  </tr>
{% endfor %}
</table>

### トピックス・Topics

<table>
{% for data in topics %}
  <tr>
    <td width=1000>
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
