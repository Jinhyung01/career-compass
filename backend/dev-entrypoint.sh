#!/bin/sh
set -eu

compile_pid=""
boot_pid=""

cleanup() {
  trap - INT TERM EXIT
  if [ -n "$boot_pid" ]; then
    kill "$boot_pid" 2>/dev/null || true
  fi
  if [ -n "$compile_pid" ]; then
    kill "$compile_pid" 2>/dev/null || true
  fi
  wait 2>/dev/null || true
}

trap cleanup INT TERM EXIT

# DevTools는 classpath 변경을 감지하므로, 별도 continuous build가 source를 compile한다.
./gradlew classes --no-daemon
./gradlew classes --continuous --no-daemon \
  -Dorg.gradle.continuous.quietperiod=300 &
compile_pid=$!

./gradlew bootRun --no-daemon &
boot_pid=$!

wait "$boot_pid"
