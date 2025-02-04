/****************************************************************************
 * Copyright 2021 EPAM Systems
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 ***************************************************************************/

export enum ChemicalMimeType {
  Mol = 'chemical/x-mdl-molfile',
  Rxn = 'chemical/x-mdl-rxnfile',
  DaylightSmiles = 'chemical/x-daylight-smiles',
  ExtendedSmiles = 'chemical/x-chemaxon-cxsmiles',
  DaylightSmarts = 'chemical/x-daylight-smarts',
  InChI = 'chemical/x-inchi',
  InChIAuxInfo = 'chemical/x-inchi-aux',
  CDXML = 'chemical/x-cdxml',
  CML = 'chemical/x-cml',
  KET = 'chemical/x-indigo-ket'
}

export interface WithStruct {
  struct: string
}

export interface WithFormat {
  format: ChemicalMimeType
}

export interface WithOutputFormat {
  output_format: ChemicalMimeType
}

export interface WithSelection {
  selected?: Array<number>
}

export interface CheckData extends WithStruct {
  types: Array<string>
}

export interface CheckResult {
  [key: string]: string
}

export interface ConvertData extends WithStruct, WithOutputFormat {}

export interface ConvertResult extends WithStruct, WithFormat {}

export interface LayoutData extends WithStruct, WithOutputFormat {}

export interface LayoutResult extends WithStruct, WithFormat {}

export interface CleanData
  extends WithStruct,
    WithSelection,
    WithOutputFormat {}

export interface CleanResult extends WithStruct, WithFormat {}

export interface AromatizeData extends WithStruct, WithOutputFormat {}

export interface AromatizeResult extends WithStruct, WithFormat {}

export interface DearomatizeData extends WithStruct, WithOutputFormat {}

export interface DearomatizeResult extends WithStruct, WithFormat {}

export interface CalculateCipData extends WithStruct, WithOutputFormat {}

export interface CalculateCipResult extends WithStruct, WithFormat {}

export interface CalculateData extends WithStruct, WithSelection {
  properties: Array<string>
}

export interface CalculateResult {
  [key: string]: string | number | boolean
}

export interface AutomapData extends WithStruct, WithOutputFormat {
  mode: string
}

export interface AutomapResult extends WithStruct, WithFormat {}

export interface InfoResult {
  indigoVersion: string
  imagoVersions: Array<string>
  isAvailable: boolean
}

export interface RecognizeResult extends WithStruct, WithOutputFormat {}

export interface StructServiceOptions {
  [key: string]: string | number | boolean | undefined
}

export type OutputFormatType = 'png' | 'svg'
export interface GenerateImageOptions extends StructServiceOptions {
  outputFormat: OutputFormatType
  backgroundColor?: string
}

export interface StructService {
  info: () => Promise<InfoResult>
  convert: (
    data: ConvertData,
    options?: StructServiceOptions
  ) => Promise<ConvertResult>
  layout: (
    data: LayoutData,
    options?: StructServiceOptions
  ) => Promise<LayoutResult>
  clean: (
    data: CleanData,
    options?: StructServiceOptions
  ) => Promise<CleanResult>
  aromatize: (
    data: AromatizeData,
    options?: StructServiceOptions
  ) => Promise<AromatizeResult>
  dearomatize: (
    data: DearomatizeData,
    options?: StructServiceOptions
  ) => Promise<DearomatizeResult>
  calculateCip: (
    data: CalculateCipData,
    options?: StructServiceOptions
  ) => Promise<CalculateCipResult>
  automap: (
    data: AutomapData,
    options?: StructServiceOptions
  ) => Promise<AutomapResult>
  check: (
    data: CheckData,
    options?: StructServiceOptions
  ) => Promise<CheckResult>
  calculate: (
    data: CalculateData,
    options?: StructServiceOptions
  ) => Promise<CalculateResult>
  recognize: (blob: Blob, version: string) => Promise<RecognizeResult>
  generateImageAsBase64: (
    data: string,
    options?: GenerateImageOptions
  ) => Promise<string>
}
