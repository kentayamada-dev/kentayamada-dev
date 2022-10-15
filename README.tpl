{%- set WEATHERS, SATELLITE_IMAGE, NEWS, FLASH, TOPICS, SATELLITE_URL  = "Weathers", "SatelliteImage", "News", "Flash", "Topics", "https://zoom.earth/places/japan/#overlays=labels:off" -%}

<img src=static/live_japan.gif width="100%" />

<details>
<summary>目次・TOC</summary>

- [天気・Weathers](#{{ WEATHERS }})
{%- for _, data in weather.items() %}
  - [{{ data["name"]["ja"] }}・{{ data["name"]["en"] }}](#{{ data["name"]["en"] }})
{%- endfor %}
- [衛星写真・Satellite Image](#{{ SATELLITE_IMAGE }})
- [ニュース・News](#{{ NEWS }})
  - [速報・Flash](#{{ FLASH }})
  - [トピックス・Topics](#{{ TOPICS }})
</details>

<h2 id={{ WEATHERS }}>天気・Weathers</h2>

{%- for _, data in weather.items() %}
<h3 id={{ data["name"]["en"] }}>{{ data["name"]["ja"] }}・{{ data["name"]["en"] }}</h3>

<table>
  <tr />
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
      <img src=static/weathers/{{ city["weather"]["icon"] }} alt="{{ city["name"]["en"] }} Weather Icon" /><br />
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
      <a href={{ city["yt"]["url"] }}>
        <img src={{ city["yt"]["img_path"] }} alt="{{ city["name"]["ja"] }}・{{ city["name"]["en"] }}" />
      </a>
    </td>
{%- endfor %}
  </tr>
</table>
{% endfor -%}

<h2 id={{ SATELLITE_IMAGE }}>衛星写真・Satellite Image</h2>

<table>
  <tr>
    <td colspan=4 align=center>
      &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;<br />
      <a href={{ SATELLITE_URL }}>
        <img src={{ satellite_image_path }} alt="衛星写真・Satellite Image">
      </a>
      <br />
      &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;
    </td>
  </tr>
</table>

<h2 id={{ NEWS }}>ニュース・News</h2>

<h3 id={{ FLASH }}>速報・Flash</h3>

<table>
{%- for data in flashes %}
  <tr>
    <td width=1000>
      <a href={{ data["link"] }}>
        <img align=left width=150 src={{ data["image"] }}> {{ data["title"] }}
      </a>
    </td>
  </tr>
{% endfor %}
</table>

<h3 id={{ TOPICS }}>トピックス・Topics</h3>

<table>
{%- for data in topics %}
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
