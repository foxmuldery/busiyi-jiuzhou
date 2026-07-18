#!/bin/zsh
set -euo pipefail

ROOT_DIR="/Users/yuanzhe/Documents/game"
DEFAULT_PORT="${BSI_JIUZHOU_PORT:-4182}"
PORT="$DEFAULT_PORT"

while ! python3 - "$PORT" <<'PY'
import socket
import sys

port = int(sys.argv[1])
sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
sock.settimeout(0.2)
try:
    sock.bind(("127.0.0.1", port))
except OSError:
    sys.exit(1)
finally:
    sock.close()
PY
do
  PORT=$((PORT + 1))
done

PLAYTEST_URL="http://127.0.0.1:${PORT}/GitHub%E8%B5%84%E4%BA%A7%E5%8C%BA/03_WebDemo/prototype/%E8%AF%95%E7%8E%A9%E5%85%A5%E5%8F%A3.html"
FRESH_URL="http://127.0.0.1:${PORT}/GitHub%E8%B5%84%E4%BA%A7%E5%8C%BA/03_WebDemo/prototype/index.html?fresh=1"

clear
echo "《不思异：九州》P0 试玩服务已准备启动"
echo ""
echo "试玩入口："
echo "$PLAYTEST_URL"
echo ""
echo "干净新局："
echo "$FRESH_URL"
echo ""
echo "说明："
echo "- 浏览器会自动打开试玩入口。"
echo "- 这个终端窗口不要关闭；关闭窗口就会停止试玩服务。"
echo "- 如果默认端口被占用，脚本会自动顺延到下一个可用端口。"
echo ""

python3 -m http.server "$PORT" --bind 127.0.0.1 --directory "$ROOT_DIR" &
SERVER_PID=$!

cleanup() {
  kill "$SERVER_PID" >/dev/null 2>&1 || true
}
trap cleanup EXIT INT TERM

sleep 0.8
open "$PLAYTEST_URL"
wait "$SERVER_PID"
