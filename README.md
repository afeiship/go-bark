# go-bark
> Bark sdk for golang.

## installation
```sh
go get -u github.com/afeiship/go-bark
```

## usage
```go
package main

import "github.com/afeiship/go-bark"

func main() {
    bark.Notify(&bark.MessageBody{
		Title: "Hello",
		Body:  "This is a test message from go-bark"
	})
}
```