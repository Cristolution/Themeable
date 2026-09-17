import { Button } from '../ui/Button'

type Props = {
  onImportText: (text: string) => void
  onExport: () => void
}

export function ImportExport({ onImportText, onExport }: Props) {
  const handleImport = () => {
    const input = document.createElement('input')
    input.type = 'file'
    input.accept = 'application/json,.json'
    input.onchange = async () => {
      const file = input.files?.[0]
      if (!file) return
      const text = await file.text()
      onImportText(text)
    }
    input.click()
  }

  return (
    <div className="import-export">
      <Button variant="ghost" size="sm" onClick={handleImport}>Import JSON</Button>
      <Button variant="ghost" size="sm" onClick={onExport}>Export JSON</Button>
    </div>
  )
}