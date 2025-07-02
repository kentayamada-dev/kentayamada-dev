for url in "$@"; do
    url=`sed -e 's@^[A-Za-z0-9-][A-Za-z0-9-]*/[A-Za-z0-9-][A-Za-z0-9-]*$@https://github.com/&@' <<< "$url"`
    curl -sL "$url" \
    | sed -n '/<script type="application\/json" data-target="react-partial.embeddedData">/,/<\/script>/p' \
    | sed 's/\\u003e/>/g; s/\\u002F/\//g; s/\\u0022/"/g; s/\\//g' \
    | grep -oE 'https?://camo.githubusercontent.com/[^"]+' \
    | while read -r url; do
        curl -sX PURGE "$url" >/dev/null &
    done &
done
wait
