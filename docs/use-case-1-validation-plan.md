# Use Case 1 validation plan

Use non-sensitive test media only. A production pass requires all scenarios below.

| ID | Scenario | Pass condition |
| --- | --- | --- |
| UC1-01 | Google/email sign-in and archive creation | Owner session and archive membership persist; anonymous access is rejected. |
| UC1-02 | Written source | Original text, author, time, review state, and audit event persist. |
| UC1-03 | Voice record/upload | Permission is explicit; original audio plays if transcription is pending or fails. |
| UC1-04 | Photo/video/file capture | Selected original is privately stored with receipt and metadata. |
| UC1-05 | Cancel | No object or memory record is created. |
| UC1-06 | Refinement | Labelled child record links to immutable original. |
| UC1-07 | Narrative selection | Pending/unapproved source is rejected; owner-approved source creates a versioned manifest. |
| UC1-08 | Accessibility/mobile | Keyboard, labels, mobile picker, and recorder are usable. |

Evidence: source IDs, audit IDs, object metadata, screenshots, API responses, typecheck/build output, and a production browser run.
