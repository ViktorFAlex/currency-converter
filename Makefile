lint:
	make -C frontend lint

install:
	npm ci

build:
	make -C frontend build

start:
	make -C frontend start