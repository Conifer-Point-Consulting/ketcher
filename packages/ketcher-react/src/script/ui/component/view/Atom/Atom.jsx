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

import { ElementColor } from 'ketcher-core'

function Atom({ el, shortcut, className, ...props }) {
  return (
    <button
      title={shortcut ? `${el.title} (${shortcut})` : el.title}
      className={className}
      style={{ color: ElementColor[el.label] }}
      value={el.number}
      {...props}
    >
      <span>{el.label}</span>
    </button>
  )
}

export default Atom
