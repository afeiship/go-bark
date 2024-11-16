package bark

import (
	"fmt"
	"log"
	"os"

	"github.com/afeiship/go-fetch"
)

// @references: https://github.com/afeiship/bark-jssdk/blob/master/src/typing.ts

// curl -X "POST" "https://api.day.app/your_key" \
//      -H 'Content-Type: application/json; charset=utf-8' \
//      -d $'{
//   "body": "Test Bark Server",
//   "title": "Test Title",
//   "badge": 1,
//   "category": "myNotificationCategory",
//   "sound": "minuet.caf",
//   "icon": "https://day.app/assets/images/avatar.jpg",
//   "group": "test",
//   "url": "https://mritd.com"
// }'

type SoundType string

const (
	Alarm              SoundType = "alarm"
	Anticipate         SoundType = "anticipate"
	Bell               SoundType = "bell"
	Birdsong           SoundType = "birdsong"
	Bloom              SoundType = "bloom"
	Calypso            SoundType = "calypso"
	Chime              SoundType = "chime"
	Choo               SoundType = "choo"
	Descent            SoundType = "descent"
	Electronic         SoundType = "electronic"
	Fanfare            SoundType = "fanfare"
	Glass              SoundType = "glass"
	Gotosleep          SoundType = "gotosleep"
	Healthnotification SoundType = "healthnotification"
	Horn               SoundType = "horn"
	Ladder             SoundType = "ladder"
	Mailsent           SoundType = "mailsent"
	Minuet             SoundType = "minuet"
	Multiwayinvitation SoundType = "multiwayinvitation"
	Newmail            SoundType = "newmail"
	Newsflash          SoundType = "newsflash"
	Noir               SoundType = "noir"
	Paymentsuccess     SoundType = "paymentsuccess"
	Shake              SoundType = "shake"
	Sherwoodforest     SoundType = "sherwoodforest"
	Silence            SoundType = "silence"
	Spell              SoundType = "spell"
	Suspense           SoundType = "suspense"
	Telegraph          SoundType = "telegraph"
	Tiptoes            SoundType = "tiptoes"
	Typewriters        SoundType = "typewriters"
	Update             SoundType = "update"
)

type MessageBody struct {
	Title    string    `json:"title"`
	Body     string    `json:"body"`
	Badge    int       `json:"badge"`
	Category string    `json:"category"`
	Sound    SoundType `json:"sound"`
	Icon     string    `json:"icon"`
	Group    string    `json:"group"`
	URL      string    `json:"url"`
}

const baseURL = "https://api.day.app"

// Client is the client for bark sdk
type Client struct {
	SdkKey string
}

// NewClient creates a new client with the given sdk key
func NewClient(sdkKey ...string) *Client {
	var key string
	if len(sdkKey) > 0 && sdkKey[0] != "" {
		key = sdkKey[0]
	} else {
		key = os.Getenv("BARK_SDK_KEY")
	}
	return &Client{
		SdkKey: key,
	}
}

func (c *Client) Notify(body *MessageBody) (string, error) {
	apiURL := fmt.Sprintf("%s/%s", baseURL, c.SdkKey)
	return fetch.Post(apiURL, &fetch.Config{
		DataType: "json",
		Body:     body,
	})
}

func Msg(title, body string) {
	_, err := NewClient().Notify(&MessageBody{
		Title: title,
		Body:  body,
	})
	if err != nil {
		log.Fatalf("Failed to send notification: %v", err)
	}
}
