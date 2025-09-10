import { Card, CardContent } from "@/components/ui/card"

interface ClickableBoxProp {
  message: {
    MsgId: number,
    content: string,
  }
  handleClick: (MsgId: number) => void
}
export default function ClickableBox({ message, handleClick }: ClickableBoxProp) {
  return (
    <Card
      onClick={() => handleClick(message.MsgId)}
      className="cursor-pointer hover:shadow-lg transition"
    >
      <CardContent>
        <h2 className="text-xl font-bold">Suggested Message</h2>
        <p>{message.content}</p>
      </CardContent>
    </Card>
  )
}
