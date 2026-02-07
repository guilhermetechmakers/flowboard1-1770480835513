import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { FileUp, FileDown } from 'lucide-react'

export function ImportExportPage() {
  const [importFile, setImportFile] = useState<File | null>(null)

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-h2 font-semibold text-foreground">Import & Export</h1>
        <p className="mt-1 text-muted-foreground">Data ingestion and content export</p>
      </div>

      <Tabs defaultValue="import">
        <TabsList>
          <TabsTrigger value="import">Import</TabsTrigger>
          <TabsTrigger value="export">Export</TabsTrigger>
        </TabsList>

        <TabsContent value="import" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileUp className="h-5 w-5" />
                Import
              </CardTitle>
              <CardDescription>
                Upload CSV or JSON. Column mapping and validation available.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div
                className="border-2 border-dashed border-border rounded-lg p-12 text-center hover:border-primary/50 transition-colors cursor-pointer"
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => {
                  e.preventDefault()
                  const file = e.dataTransfer.files[0]
                  if (file) setImportFile(file)
                }}
              >
                <input
                  type="file"
                  accept=".csv,.json"
                  className="hidden"
                  id="import-file"
                  onChange={(e) => setImportFile(e.target.files?.[0] ?? null)}
                />
                <label htmlFor="import-file" className="cursor-pointer">
                  <FileUp className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <p className="text-muted-foreground">
                    {importFile ? importFile.name : 'Drag and drop or click to upload'}
                  </p>
                  <p className="text-sm text-muted-foreground mt-1">CSV or JSON</p>
                </label>
              </div>
              <Button disabled={!importFile}>Import</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="export" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileDown className="h-5 w-5" />
                Export
              </CardTitle>
              <CardDescription>
                Export as PNG, PDF, CSV, or JSON. Select area or nodes.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-wrap gap-4">
                <Button variant="outline">Export PNG</Button>
                <Button variant="outline">Export PDF</Button>
                <Button variant="outline">Export CSV</Button>
                <Button variant="outline">Export JSON</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
