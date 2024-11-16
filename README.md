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
import "fmt"

func main() {
	// short message
	bark.Msg("Hello, world!")
	
	// long message
	bark.Msg("Warning", "This is a warning message.")
	
	// more options
	client := bark.NewClient()
	res, _ := client.Notify(
		&bark.Message{
			Title: "Hello",
			Body:  "This is a test message from go-bark",
		},
	)
	
	// check response
	fmt.Println("Response: ", res)
}
```