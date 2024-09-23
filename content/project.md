---
title: "Project"
---

The OmniBOR project consists of:

- The [OmniBOR specification][spec]
- A set of first-party OmniBOR implementations, including:
  - [`omnibor-rs`][rust]: A Rust implementation
  - [`omnibor-go`][go]: A Go implementation
  - [`omnibor-dotnet`][dotnet]: A .NET implementation
  - [`omnibor-py`][python]: A Python implementation
- A set of patches for third-party software to add OmniBOR support, including:
  - [`patch-omnibor`][patch]: A patched version of GNU `patch`.
  - [`gcc-omnibor`][gcc]: A patched version of GCC.
  - [`binutils-omnibor`][binutils]: A patched version of `binutils`.
  - [`llvm-omnibor`][llvm]: A patched version of LLVM.
- Miscellaneous other tools related to OmniBOR, including:
  - [`bomsh`][bomsh]: Shell scripts for interacting with OmniBOR data.
  - [`jbor`][jbor]: A Java agent to log OmniBOR Artifact IDs.
- The [OmniBOR website][site]
- OmniBOR project spaces, including:
  - GitHub Discussions under on any OmniBOR repositories.
  - The weekly OmniBOR Working Group meetings.
  - Any other meetings or discussion spaces operated by the OmniBOR project.

## Code of Conduct

All OmniBOR projects and spaces are covered by the [OmniBOR Project Code of
Conduct][coc].

## Governance

The OmniBOR Project is governed by consensus among active project
participants. Generally, being an "active project participant" means
participating in the weekly OmniBOR Working Group meetings, currently
held over Zoom from 10am to 11am Pacific Time on Mondays.

Proposals for improvements to the language are generally discussed
during these meetings, and when consensus is reached on a design, a formal
proposal is made to the relevant repository and the change is merged.

The project does have a Core Team of long-term active participants. The
OmniBOR Core Team currently consists of:

* [Aeva Black][aeva]
* [Ed Warnicke][ed]
* [Ashley Williams][ashley]
* [Frederick Kautz][frederick]
* [David Pollak][david]
* [Andrew Lilley Brinker][andrew]

[spec]: https://github.com/omnibor/spec
[coc]: https://github.com/omnibor/spec/blob/main/code_of_conduct.md
[rust]: https://github.com/omnibor/omnibor-rs
[go]: https://github.com/omnibor/omnibor-go
[dotnet]: https://github.com/omnibor/omnibor-dotnet
[python]: https://github.com/omnibor/omnibor-py
[aeva]: https://aeva.online/about/
[ed]: https://github.com/edwarnicke
[ashley]: https://github.com/ashleygwilliams
[frederick]: https://x.com/ffkiv
[david]: https://github.com/dpp
[andrew]: https://www.alilleybrinker.com/
[patch]: https://github.com/omnibor/patch-omnibor
[gcc]: https://github.com/omnibor/gcc-omnibor
[binutils]: https://github.com/omnibor/binutils-omnibor
[llvm]: https://github.com/omnibor/llvm-omnibor
[bomsh]: https://github.com/omnibor/bomsh
[jbor]:  https://github.com/omnibor/jbor
[site]: https://omnibor.io
