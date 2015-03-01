#!/bin/bash
for file in *.wav.dup; do
	mv "$file" "`basename $file .wav.dup`.wav"
done
