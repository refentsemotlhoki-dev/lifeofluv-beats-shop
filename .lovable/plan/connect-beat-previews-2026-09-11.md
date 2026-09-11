# Connect beat previews

## Changes
- Add each provided public WAV URL to its matching beat.
- Correct the Velvet Hours URL to the reachable `velvet-hours.wav` file that matches its supplied filename.
- Verify previews play through the shared controls on the home, catalogue, and beat pages.

## Technical details
- Update only the shared beat data source, since all three page types already use the same preview player.
- Confirm the six public audio files respond successfully and check the rendered player states.
