Gets the number of instances of the specified script is currently running.

Actually returns numRefs - 1.
if (program)
	v3 = rage::scrProgram::GetNumRefs(program) - 1;
return v3;