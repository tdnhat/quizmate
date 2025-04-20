import { Button } from '@/components/ui/button'
import { ChevronLeft } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
type Props = {
    route: string
    label: string
}

const BackButton = ({ route, label }: Props) => {
    const navigate = useNavigate()

    const handleClick = () => {
        navigate(route)
    }
    return (
        <Button
            variant="outline"
            size="sm"
            className="text-gray-500 cursor-pointer mb-4"
            onClick={handleClick}
            >
            <ChevronLeft className="h-5 w-5" />
            {label}
        </Button>
  )
}

export default BackButton;
